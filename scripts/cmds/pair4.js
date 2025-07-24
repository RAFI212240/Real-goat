const axios = require("axios");
const fs = require("fs-extra");
const { loadImage, createCanvas } = require("canvas");
const path = require("path");

module.exports = {
  config: {
    name: "pair4",
    version: "1.1",
    countDown: 10,
    role: 0,
    author: "Modified by Assistant",
    shortDescription: {
      en: "Get to know your partner",
    },
    longDescription: {
      en: "Find your soulmate from the group based on opposite gender.",
    },
    category: "LOVE",
    guide: {
      en: "{pn} or {pn} @mention",
    },
  },

  onStart: async function ({ api, event, usersData }) {
    try {
      // অ্যাসেট ফোল্ডার তৈরি করা
      const assetsPath = path.join(__dirname, "assets");
      if (!fs.existsSync(assetsPath)) {
        fs.mkdirSync(assetsPath);
      }

      const pathImg = path.join(assetsPath, "background.png");
      const pathAvt1 = path.join(assetsPath, "avatar1.png");
      const pathAvt2 = path.join(assetsPath, "avatar2.png");

      // টার্গেট ইউজার নির্ধারণ (মেনশন বা সেন্ডার)
      let targetID = event.senderID;
      const mentions = Object.keys(event.mentions);
      if (mentions.length > 0) {
        targetID = mentions[0];
      }

      const targetName = await usersData.getName(targetID);
      const threadInfo = await api.getThreadInfo(event.threadID);
      const allUsers = threadInfo.userInfo;

      // টার্গেট ইউজারের লিঙ্গ খুঁজে বের করা
      const targetUserInfo = allUsers.find(user => user.id === targetID);
      const targetGender = targetUserInfo ? targetUserInfo.gender : null;

      if (!targetGender) {
        return api.sendMessage(`দুঃখিত, ${targetName}-এর লিঙ্গ নির্ধারণ করা যায়নি।`, event.threadID, event.messageID);
      }

      const botID = api.getCurrentUserID();
      let candidates = [];

      // বিপরীত লিঙ্গের সঙ্গী খোঁজা
      if (targetGender.toLowerCase() === "male") {
        candidates = allUsers.filter(user => user.id !== targetID && user.id !== botID && user.gender && user.gender.toLowerCase() === "female");
      } else if (targetGender.toLowerCase() === "female") {
        candidates = allUsers.filter(user => user.id !== targetID && user.id !== botID && user.gender && user.gender.toLowerCase() === "male");
      }

      // যদি উপযুক্ত সঙ্গী না পাওয়া যায়
      if (candidates.length === 0) {
        return api.sendMessage(`দুঃখিত ${targetName}, এই গ্রুপে আপনার জন্য কোনো উপযুক্ত সঙ্গী খুঁজে পাওয়া যায়নি।`, event.threadID, event.messageID);
      }

      // র‍্যান্ডম সঙ্গী নির্বাচন
      const randomPartner = candidates[Math.floor(Math.random() * candidates.length)];
      const partnerID = randomPartner.id;
      const partnerName = await usersData.getName(partnerID);

      const tile = `${Math.floor(Math.random() * 81) + 20}`; // 20% থেকে 100%

      // ছবি ডাউনলোড করার ফাংশন
      const getAvatar = async (id, filePath) => {
        try {
          const avatarUrl = `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
          const response = await axios.get(avatarUrl, { responseType: "arraybuffer" });
          fs.writeFileSync(filePath, Buffer.from(response.data));
        } catch (e) {
            console.error(`Failed to download avatar for ID ${id}:`, e);
            // ফলব্যাক ইমেজ ব্যবহার করা যেতে পারে
        }
      };
      
      const backgroundUrl = "https://i.ibb.co/RBRLmRt/Pics-Art-05-14-10-47-00.jpg";
      const bgResponse = await axios.get(backgroundUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(pathImg, Buffer.from(bgResponse.data));

      await getAvatar(targetID, pathAvt1);
      await getAvatar(partnerID, pathAvt2);

      // ক্যানভাস দিয়ে ছবি তৈরি
      const baseImage = await loadImage(pathImg);
      const baseAvt1 = await loadImage(pathAvt1);
      const baseAvt2 = await loadImage(pathAvt2);
      const canvas = createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseAvt1, 111, 175, 330, 330);
      ctx.drawImage(baseAvt2, 1018, 173, 330, 330);

      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);
      fs.removeSync(pathAvt1);
      fs.removeSync(pathAvt2);

      // চূড়ান্ত মেসেজ পাঠানো
      return api.sendMessage({
        body: `╭── 𝐏𝐚𝐢𝐫 𝐑𝐞𝐬𝐮𝐥𝐭 ──╮\n\n✨ 𝐇𝐞𝐲 ${name1}~!\n\n💘 𝐘𝐨𝐮𝐫 𝐬𝐨𝐮𝐥𝐦𝐚𝐭𝐞 𝐢𝐬: ${name2}!\n\n❤️ 𝐋𝐨𝐯𝐞 𝐌𝐚𝐭𝐜𝐡: ${tile}%\n\n⛓️ 𝐃𝐞𝐬𝐭𝐢𝐧𝐲 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐲𝐨𝐮 𝐭𝐰𝐨 𝐭𝐨𝐠𝐞𝐭𝐡𝐞𝐫~\n\n╰── ✨ 🌬️ Mahiru Shina ✨ ──╯`,
        mentions: [
          { tag: targetName, id: targetID },
          { tag: partnerName, id: partnerID },
        ],
        attachment: fs.createReadStream(pathImg),
      }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);

    } catch (error) {
      console.error("Pairing Error:", error);
      return api.sendMessage("দুঃখিত, জুটি তৈরি করার সময় একটি সমস্যা হয়েছে।", event.threadID, event.messageID);
    }
  },

  onChat: async function (context) {
    const { event } = context;
    if (event.body && (event.body.toLowerCase() === "pair" || event.body.toLowerCase() === "জুটি")) {
      // onChat থেকে onStart কল করার সময় mentions ঠিকভাবে पास করতে হবে
      // তবে এখানে সরাসরি onStart কল করা হয়েছে, যা শুধু সেন্ডারের জন্য কাজ করবে
      return this.onStart(context);
    }
  },
};
    
