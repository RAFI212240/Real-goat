const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "anya",
    version: "2.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: { en: "" },
    longDescription: { en: "Japanese Anya text to speech" },
    category: "𝗔𝗜",
    guide: { en: "{p}{n} japn [text]" }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const { createReadStream, unlinkSync } = fs;
      const { resolve } = path;
      const { messageID, threadID, senderID } = event;

      // র‍্যান্ডম গ্রিটিং মেসেজ
      const name = "Anya";
      const ranGreetVar = [`Konichiwa ${name}`, "Konichiwa senpai", "Hora"];
      const ranGreet = ranGreetVar[Math.floor(Math.random() * ranGreetVar.length)];

      // ইউজারের ইনপুট টেক্সট নিয়ে আসা
      const chat = args.join(" ");
      if (!chat) return api.sendMessage(ranGreet, threadID, messageID);

      // URL এ পাঠানোর জন্য এনকোড করা
      const text = encodeURIComponent(chat);

      // অডিও ফাইলের লোকাল পাথ
      const audioPath = resolve(__dirname, "cache", `${threadID}_${senderID}.wav`);

      // TTS API কল (speaker=3 হলো Japanese voice)
      const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${text}&speaker=3`);
      const audioUrl = audioApi.data.mp3StreamingUrl;

      // ফাইল ডাউনলোড (global.utils.downloadFile GoatBot এ আগে থেকে থাকে বলে ধরে নিয়েছি)
      await global.utils.downloadFile(audioUrl, audioPath);

      // তৈরি অডিও ফাইল পাঠানো ও পরবর্তীতে মুছে ফেলা
      const attachment = createReadStream(audioPath);
      api.sendMessage({ body: chat, attachment }, threadID, () => unlinkSync(audioPath));
    } catch (error) {
      console.error(error);
      api.sendMessage("❌ Error occurred while processing TTS.", event.threadID, event.messageID);
    }
  }
};
