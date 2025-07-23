const { createCanvas, registerFont, loadImage } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const jsn = [
  	"id": 1,
		"url": "https://i.ibb.co/546bkNt/Picsart-23-05-19-09-31-50-027.png",
		"clr": "#383f29"
	},
	{
		"id": 2,
		"url": "https://i.ibb.co/mS9FfLH/Picsart-23-05-19-09-32-44-752.png",
		"clr": "#033b74"
	},
	{
		"id": 3,
		"url": "https://i.ibb.co/VChdTpq/Picsart-23-05-19-09-30-53-908.png",
		"clr": "#326a97"
	},
	{
		"id": 4,
		"url": "https://i.ibb.co/nQ93jvy/Picsart-23-05-19-09-30-06-927.png",
		"clr": "#7c0000"
	},
	{
		"id": 5,
		"url": "https://i.ibb.co/PgzyMpH/Picsart-23-05-19-09-28-53-306.png",
		"clr": "#7c0000"
	},
	{
		"id": 6,
		"url": "https://i.ibb.co/1spfX8b/Picsart-23-05-19-09-27-58-306.png",
		"clr": "#8c1c4c"
	},
	{
		"id": 7,
		"url": "https://i.ibb.co/6g54VMb/Picsart-23-05-19-09-26-09-345.png",
		"clr": "#7c0000"
	},
	{
		"id": 8,
		"url": "https://i.ibb.co/xz7Z682/Picsart-23-05-19-09-25-32-644.png",
		"clr": "#7c0000"
	},
	{
		"id": 9,
		"url": "https://i.ibb.co/YkPFLwS/Picsart-23-05-19-09-27-10-258.png",
		"clr": "#7c0000"
	},
	{
		"id": 10,
		"url": "https://i.ibb.co/JjV76tF/Picsart-23-05-19-09-24-27-987.pngg",
		"clr": "#383e02"
	},
	{
		"id": 11,
		"url": "https://i.ibb.co/rHSHQMf/Picsart-23-05-19-09-21-37-249.png",
		"clr": "#dea438"
	},
	{
		"id": 12,
		"url": "https://i.ibb.co/qY9fNhF/Picsart-23-05-19-09-20-32-680.png",
		"clr": "#383e02"
	},
	{
		"id": 13,
		"url": "https://i.ibb.co/zrkrbBG/Picsart-23-05-19-09-22-54-571.png",
		"clr": "#075fbc"
	},
	{
		"id": 14,
		"url": "https://i.ibb.co/YcVJsM0/Picsart-23-05-19-09-22-08-345.png",
		"clr": "#c20200"
	},
	{
		"id": 15,
		"url": "https://i.ibb.co/rHSHQMf/Picsart-23-05-19-09-21-37-249.png",
		"clr": "#326a97"
	},
	{
		"id": 16,
		"url": "https://i.ibb.co/qY9fNhF/Picsart-23-05-19-09-20-32-680.png",
		"clr": "#dea438"
	},
	{
		"id": 17,
		"url": "https://i.ibb.co/zrkrbBG/Picsart-23-05-19-09-22-54-571.png",
		"clr": "#326a97"
	},
	{
		"id": 18,
		"url": "https://i.ibb.co/YcVJsM0/Picsart-23-05-19-09-22-08-345.png",
		"clr": "#0e0bbb"
	},
	{
		"id": 19,
		"url": "https://i.ibb.co/hcyfs8h/Picsart-23-05-19-09-15-07-764.png",
		"clr": "#857773"
	},
	{
		"id": 20,
		"url": "https://i.ibb.co/52G4rsq/Picsart-23-05-19-09-11-52-958.png",
		"clr": "#f3d40c"
	},
	{
		"id": 21,
		"url": "https://i.ibb.co/pKwJ8db/Picsart-23-05-19-09-12-27-121.png",
		"clr": "#65372d"
	},
	{
		"id": 22,
		"url": "https://i.ibb.co/LSXxSVN/Picsart-23-05-19-09-10-53-922.png",
		"clr": "#9901db"
	},
	{
		"id": 23,
		"url": "https://i.ibb.co/8szp4KS/Picsart-23-05-19-09-08-51-366.png",
		"clr": "#6f7999"
	},
	{
		"id": 24,
		"url": "https://i.ibb.co/R9MyFj5/Picsart-23-05-19-09-10-22-982.png",
		"clr": "#8dacd9"
	},
	{
		"id": 25,
		"url": "https://i.ibb.co/47fDhQS/Picsart-23-05-19-09-09-27-558.png",
		"clr": "#ac4c0f"
	},
	{
		"id": 26,
		"url": "https://i.ibb.co/PDcmpdZ/Picsart-23-05-19-08-12-05-428.png",
		"clr": "#af0b1e"
	},
	{
		"id": 27,
		"url": "https://i.ibb.co/nrFxQrR/Picsart-23-05-19-08-13-02-357.png",
		"clr": "#3c72e0"
	},
	{
		"id": 28,
		"url": "https://i.ibb.co/8xHHzRV/Picsart-23-05-19-08-11-10-194.png",
		"clr": "#d01597"
	},
	{
		"id": 29,
		"url": "https://i.ibb.co/rmJygTF/Picsart-23-05-19-08-07-37-972.png",
		"clr": "#d01597"
	},
	{
		"id": 30,
		"url": "https://i.ibb.co/m9Pf84r/Picsart-23-05-19-08-09-03-997.png",
		"clr": "#c5ae68"
	},
	{
		"id": 31,
		"url": "https://i.ibb.co/YX98n19/Picsart-23-05-19-08-10-16-892.png",
		"clr": "#dbc36c"
	},
	{
		"id": 32,
		"url": "https://i.ibb.co/qd9p4sF/Picsart-23-05-19-08-09-41-545.png",
		"clr": "#c30102"
	},
	{
		"id": 33,
		"url": "https://i.ibb.co/FXJ7VYY/Picsart-23-05-19-08-02-31-217.png",
		"clr": "#383c6d"
	},
	{
		"id": 34,
		"url": "https://i.ibb.co/YBQ0jRC/Picsart-23-05-19-08-04-25-349.png",
		"clr": "#143a7b"
	},
	{
		"id": 35,
		"url": "https://i.ibb.co/CK3b812/Picsart-23-05-19-08-03-18-442.png",
		"clr": "#7daed6"
	},
	{
		"id": 36,
		"url": "https://i.ibb.co/g66BQxy/Picsart-23-05-19-08-06-24-222.png",
		"clr": "#6f5f4f"
	},
	{
		"id": 37,
		"url": "https://i.ibb.co/v3hrQmY/Picsart-23-05-19-08-05-03-213.png"
	},
	{
		"id": 38,
		"url": "https://i.ibb.co/9hC1Qk7/Picsart-23-05-19-07-55-07-071.png"
	},
	{
		"id": 39,
		"url": "https://i.ibb.co/xHt3qD7/Picsart-23-05-19-07-55-55-543.png"
	},
	{
		"id": 40,
		"url": "https://i.ibb.co/MCSgmc1/Picsart-23-05-19-07-58-37-204.png"
	},
	{
		"id": 41,
		"url": "https://i.ibb.co/52V10Vf/Picsart-23-05-19-08-00-49-144.png"
	},
	{
		"id": 42,
		"url": "https://i.ibb.co/h7NZSTy/Picsart-23-05-19-07-53-57-215.png"
	},
	{
		"id": 43,
		"url": "https://i.ibb.co/YjmGCKC/Picsart-23-05-19-07-47-49-507.pngg"
	},
	{
		"id": 44,
		"url": "https://i.ibb.co/R94xjm4/Picsart-23-05-19-07-48-44-913.png"
	},
	{
		"id": 45,
		"url": "https://i.ibb.co/dm8Vwwg/Picsart-23-05-19-07-50-25-164.png"
	},
	{
		"id": 46,
		"url": "https://i.ibb.co/zJcqWDL/Picsart-23-05-19-07-51-13-955.png"
	},
	{
		"id": 47,
		"url": "https://i.ibb.co/h98C1G7/Picsart-23-05-19-07-52-55-761.png"
	},
	{
		"id": 48,
		"url": "https://i.ibb.co/WVC3ryY/Picsart-23-05-19-07-45-15-684.png"
	},
	{
		"id": 49,
		"url": "https://i.ibb.co/P43ZFc7/Picsart-23-05-19-07-46-53-080.png"
	},
	{
		"id": 50,
		"url": "https://i.ibb.co/7gYm3Sf/Picsart-23-05-18-13-04-32-405.png"
  // ... তোমার বাকি আইটেম গুলো এখানে বসাও ...
  { id: 50, url: "https://i.ibb.co/7gYm3Sf/Picsart-23-05-18-13-04-32-405.png" }
];

// Ensure cache directory exists
const cacheDir = path.join(__dirname, "tmp");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

module.exports = {
  config: {
    name: "pubg",
    version: "1.1",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "Create PUBG style avatar image",
    longDescription: "",
    category: "fun",
    guide: {
      en: "{pn} <id Number> | <name> | <color>"
    }
  },

  onStart: async function ({ event, message, args }) {
    try {
      if (args.length === 0) return message.reply("Usage: /pubg <id> | <name> | <color>");

      let input = args.join(" ").split("|").map(x => x.trim());
      if (input.length < 2) return message.reply("Please provide at least ID and Name like:\n/pubg 3 | PlayerName | #fff");

      let id = parseInt(input[0]);
      if (isNaN(id)) return message.reply("ID must be a number.");

      const item = jsn.find(e => e.id === id);
      if (!item) return message.reply("This ID does not exist.");

      const nameText = input[1] || "Player";
      const color = input[2] || item.clr || "white";

      // Download background image
      const bgResponse = await axios.get(item.url, { responseType: "arraybuffer" });
      const bgBuffer = Buffer.from(bgResponse.data);

      // Save temp background image
      const bgPath = path.join(cacheDir, `bg_${id}.png`);
      await fs.writeFile(bgPath, bgBuffer);

      // Load font - load once only
      const fontPath = registerFont(path.join(__dirname, "cache", "Vampire Wars.ttf"),
      if (!fs.existsSync(fontPath)) {
        // optionally download or instruct user to add the font file here
        return message.reply("Font file not found. Please add 'Vampire Wars.ttf' in the module folder.");
      }
      registerFont(fontPath, { family: "Abcd" });

      // create canvas
      const canvas = createCanvas(1080, 1080);
      const ctx = canvas.getContext("2d");

      ctx.imageSmoothingEnabled = false;
      ctx.patternQuality = "best";
      ctx.antialias = "default";
      ctx.filter = "default";

      // draw background image
      const bgImage = await loadImage(bgPath);
      ctx.drawImage(bgImage, 0, 0, 1080, 1080);

      // set font size dynamic to fit width
      let fontSize = 130;
      do {
        fontSize--;
        ctx.font = `${fontSize}pt Abcd`;
      } while (ctx.measureText(nameText).width > canvas.width - 32);
      
      // draw styled text
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      ctx.strokeText(nameText, canvas.width / 2, 432);
      ctx.strokeText(nameText, canvas.width / 2, 708);
      ctx.fillText(nameText, canvas.width / 2, 574);
      ctx.strokeText(nameText, canvas.width / 2, 574);

      // save final image
      const outBuffer = canvas.toBuffer("image/png");
      const outputPath = path.join(cacheDir, `pubg_avatar_${Date.now()}.png`);
      await fs.writeFile(outputPath, outBuffer);

      // send image with info
      await message.reply({
        body: `✅ Your PUBG Avatar Created!\nID: ${item.id}\nName: ${nameText}\nColor: ${color}`,
        attachment: fs.createReadStream(outputPath)
      });

      await fs.unlink(outputPath);
      await fs.unlink(bgPath);

    } catch (err) {
      console.error(err);
      message.reply("❌ Error occurred while creating PUBG avatar.");
    }
  }
};
