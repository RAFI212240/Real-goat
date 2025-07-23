const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const Canvas = require("canvas");

const sendWaiting = true; // চালু থাকলে loading মেসেজ পাঠাবে
const textWaiting = "✨ Image initialization, please wait a moment ✨";
const FONT_PATH = path.resolve(__dirname, "cache", "Play-Bold.ttf");
const FONT_LINK = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download";
const FONT_SIZE_TITLE = 28;
const FONT_SIZE_TEXT = 20;
const COLOR_NAME = "#00FFFF";

async function downloadFontIfNeeded() {
  if (!fs.existsSync(FONT_PATH)) {
    const fontData = await axios.get(FONT_LINK, { responseType: "arraybuffer" });
    await fs.outputFile(FONT_PATH, Buffer.from(fontData.data));
  }
}

function formatText(label, value) {
  return `✨ ${label}:  ${value}`;
}

module.exports = {
  config: {
    name: "cardinfo",
    version: "1.1",
    author: "kshitiz (Modified by Perplexity)",
    countDown: 5,
    role: 0,
    shortDescription: "make a simple group card info",
    category: "logo",
    guide: "{pn} <Name> <Sex> <followers> <love> <DOB> <Location> <FB Link>",
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      if (sendWaiting) {
        await message.reply(textWaiting);
      }

      await downloadFontIfNeeded();

      let uid = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;

      const userInfo = await api.getUserInfo(uid);
      const avatarResponse = await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
      const bgResponse = await axios.get("https://i.imgur.com/tW6nSDm.png", { responseType: "arraybuffer" });

      const pathAvatar = path.join(__dirname, "cache", "avatar.png");
      const pathOutput = path.join(__dirname, "cache", "output.png");

      await fs.writeFile(pathAvatar, Buffer.from(avatarResponse.data));
      await fs.writeFile(pathOutput, Buffer.from(bgResponse.data));

      // Load Jimp to circle avatar
      const jimp = require("jimp");
      let avatarImg = await jimp.read(pathAvatar);
      avatarImg.circle();
      const avatarBuffer = await avatarImg.getBufferAsync(jimp.MIME_PNG);
      fs.writeFileSync(pathAvatar, avatarBuffer);

      // Load images into canvas
      const baseImage = await Canvas.loadImage(pathOutput);
      const avatarImage = await Canvas.loadImage(pathAvatar);
      const canvas = Canvas.createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext("2d");

      // Draw background & avatar
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(avatarImage, 80, 73, 285, 285);

      // Register font & set style
      Canvas.registerFont(FONT_PATH, { family: "Play-Bold" });
      ctx.fillStyle = COLOR_NAME;
      ctx.textBaseline = "top";

      ctx.font = `${FONT_SIZE_TITLE}px Play-Bold`;

      // Assign values - fallback to args if no data from api
      const name = userInfo.name && userInfo.name !== "no data" ? userInfo.name : args[0] || "Not Found";
      const gender = userInfo.gender && userInfo.gender !== "no data" ? userInfo.gender : args[1] || "Not Found";
      const follow = userInfo.follow && userInfo.follow !== "no data" ? userInfo.follow : args[2] || "Not Found";
      const love = userInfo.relationship_status && userInfo.relationship_status !== "no data" ? userInfo.relationship_status : args[3] || "Not Found";
      const birthday = userInfo.birthday && userInfo.birthday !== "no data" ? userInfo.birthday : args[4] || "Not Found";
      const location = userInfo.location && userInfo.location !== "no data" ? userInfo.location : args[5] || "Not Found";
      const link = userInfo.link && userInfo.link !== "no data" ? userInfo.link : args[6] || "Not Found";

      // Draw texts with animation style (color + symbol)
      const startX = 480;
      const startY = 172;
      const lineHeight = 38;

      const textLines = [
        `💜 Name: ${name}`,
        `🧬 Gender: ${gender}`,
        `👥 Followers: ${follow}`,
        `💖 Relationship: ${love}`,
        `🎂 Birthday: ${birthday}`,
        `📍 Location: ${location}`,
        `🔗 ID: ${uid}`,
      ];

      for (let i = 0; i < textLines.length; i++) {
        ctx.fillStyle = `hsl(${200 + i * 20}, 100%, 50%)`; // gradient style color
        ctx.fillText(textLines[i], startX, startY + i * lineHeight);
      }

      ctx.font = `${FONT_SIZE_TEXT + 5}px Play-Bold`;
      ctx.fillStyle = "#0ff";
      ctx.fillText(link, 175, 470);

      // Write final image
      const finalBuffer = canvas.toBuffer("image/png");
      await fs.writeFile(pathOutput, finalBuffer);

      // clean avatar temp
      await fs.remove(pathAvatar);

      // Send image as attachment and delete after sending
      return api.sendMessage(
        { attachment: fs.createReadStream(pathOutput) },
        event.threadID,
        () => fs.unlinkSync(pathOutput),
        event.messageID
      );
    } catch (err) {
      console.error("Error in cardinfo2 cmd:", err);
      return message.reply("⚠️ ছবিটি তৈরিতে সমস্যা হয়েছে!");
    }
  },
};
