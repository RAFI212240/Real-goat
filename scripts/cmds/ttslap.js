const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "ttslap",
    aliases: ["sp"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "slap",
    longDescription: "",
    category: "write",
    guide: {
      vi: "{pn} text1 | text2",
      en: "{pn} text1 | text2"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    let text = args.join(" ");
    if (!text || !text.includes("|")) {
      return api.sendMessage('Please enter the correct format: [text1 | text2]!', event.threadID, event.messageID);
    }

    const text1 = text.substr(0, text.indexOf("|")).trim();
    const text2 = text.substr(text.indexOf("|") + 1).trim();

    if (!text1 || !text2) {
      return api.sendMessage('Please enter the correct format: [text1 | text2]!', event.threadID, event.messageID);
    }

    // Path to save temporary file
    const tempPath = path.join(__dirname, "assets", "any.png");

    const callback = () => {
      api.sendMessage({
        body: "",
        attachment: fs.createReadStream(tempPath)
      }, event.threadID, () => fs.unlinkSync(tempPath), event.messageID);
    };

    // Encode text parts for URL
    const urlText1 = encodeURIComponent(text1);
    const urlText2 = encodeURIComponent(text2);

    // Download image with request and save to tempPath
    request(encodeURI(`https://api.memegen.link/images/slap/${urlText1}/${urlText2}.png`))
      .pipe(fs.createWriteStream(tempPath))
      .on("close", () => callback())
      .on("error", (err) => {
        console.error(err);
        api.sendMessage("Failed to create image, please try again.", event.threadID, event.messageID);
      });
  }
};
