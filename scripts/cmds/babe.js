const { GoatWrapper } = require("fca-liane-utils");
const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/ARYAN-AROHI-STORE/A4YA9-A40H1/refs/heads/main/APIRUL.json`,
  );
  return base.data.api;
};

const languagesMap = {
  ar: "arabic",
  bn: "bangla",
  en: "english",
  hi: "hindi",
  id: "indonesian",
  ne: "nepali",
  tl: "tagalog",
  te: "telugu",
  ur: "urdu",
  vi: "vietnamese"
};

// Default language set Bangla
const shortLang = "bn"; 

// You can change this language to your preferred language code
// Example:
// const shortLang = "hi"; // For Hindi
// const shortLang = "en"; // For English

const lang = languagesMap[shortLang] || "bangla";

module.exports.config = {
  name: "babe",
 version : "1.0.0",
  role: 0,
  author: "dipto| ArYan",//no prefix by ArYan
  description: "better then all Sim simi with multiple conversation",
  guide: { en: "[message]" },
  category: "ChatBots",
  coolDowns: 5,
};
module.exports.onReply = async function ({ api, event }) {
  if (event.type == "message_reply") {
    const reply = event.body.toLowerCase();
    if (isNaN(reply)) {
      /*const response = await axios.get(
        `${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&language=${lang}`,
      );*/
      const response = await axios.get(
        `${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}`,
      );
      const ArYan = response.data.reply;
      await api.sendMessage(
        ArYan,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: ArYan,
          });
        },
        event.messageID,
      );
    }
  }
};
module.exports.onStart = async function ({ api, args, event }) {
  try {
    const dipto = args.join(" ").toLowerCase();
    if (!args[0]) {
      api.sendMessage(
        "Hmm baby",
        event.threadID,
        event.messageID,
      );
      return;
    }
    if (dipto) {
    /*const response = await axios.get(
        `${await baseApiUrl()}/baby?text=${dipto}&language=${lang}`,
      );*/
      const response = await axios.get(
        `${await baseApiUrl()}/baby?text=${dipto}`,
      );
      const mg = response.data.reply;
      await api.sendMessage(
        { body: mg },
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: mg,
          });
        },
        event.messageID,
      );
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(
      `${error.message}.\nAn error`,
      event.threadID,
      event.messageID,
    );
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
