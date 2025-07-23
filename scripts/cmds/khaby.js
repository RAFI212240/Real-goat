const request = require('request');
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "khaby",
    aliases: ["khaby"],
    version: "1.0",
    author: "Sanddddddyyyyyyyy",
    countDown: 5,
    role: 0,
    shortDescription: "make khaby meme",
    longDescription: "",
    category: "write",
    guide:  {
      vi: "{pn} text1 | text2",
      en: "{pn} text1 | text2"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    let text = args.join(" ");

    if (!text || !text.includes("|")) {
      return api.sendMessage('Please enter the correct format like !khaby Coke | Pepsi.', threadID, messageID);
    }

    const textArr = text.split("|").map(t => t.trim());
    if (textArr.length < 2 || !textArr[0] || !textArr[1]) {
      return api.sendMessage('Please enter the correct format like !khaby Coke | Pepsi.', threadID, messageID);
    }

    const text1 = encodeURIComponent(textArr[0]);
    const text2 = encodeURIComponent(textArr[1]);

    const outputPath = path.join(__dirname, "assets", "any.png");

    let callback = () => {
      api.sendMessage({
        body: "",
        attachment: fs.createReadStream(outputPath)
      }, threadID, () => fs.unlinkSync(outputPath), messageID);
    };

    request(encodeURI(`https://api.memegen.link/images/khaby-lame/${text1}/${text2}.png`))
      .pipe(fs.createWriteStream(outputPath))
      .on("close", callback)
      .on("error", (err) => {
        console.error(err);
        api.sendMessage("Failed to create meme image, please try again later.", threadID, messageID);
      });
  }
};
