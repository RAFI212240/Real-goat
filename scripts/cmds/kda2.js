const videoLinks = [
  "https://drive.google.com/uc?export=download&id=1zgn8EqLKbzCdm9vOCMNJkJg7j4TeYxM_",
  "https://drive.google.com/uc?export=download&id=1zcT3VP2ieQYFFE6jp3s9fE-2a3HVowHH",
  "https://drive.google.com/uc?export=download&id=1yrQPcV1lYUdwHhWgZ_qn3xP5WvsJCFMS",
  // বাকী লিংকগুলো এখানে যোগ করো
];

global.sentVideosForKda3 = global.sentVideosForKda3 || [];

module.exports = {
  config: {
    name: "kda2",
    aliases: ["kda2"],
    version: "3.1",
    author: "kshitiz",
    countDown: 30,
    role: 2,
    shortDescription: "Send one random kanda video (no on/off)",
    longDescription: "",
    category: "𝟭𝟴+",
    guide: "{p}{n} - Send one random video"
  },

  onStart: async function({ api, event }) {
    try {
      const threadID = event.threadID;

      // ভিডিও লিঙ্কগুলোর মধ্যে যা আগে পাঠানো হয় নি
      let availableVideos = videoLinks.filter(v => !global.sentVideosForKda3.includes(v));

      // সব ভিডিও শেষ হলে লিস্ট রিসেট
      if (availableVideos.length === 0) {
        global.sentVideosForKda3 = [];
        availableVideos = [...videoLinks];
      }

      // র‌্যান্ডম ভিডিও সিলেক্ট
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      const videoUrl = availableVideos[randomIndex];

      // সেন্ট লিস্টে যোগ করা
      global.sentVideosForKda3.push(videoUrl);

      // ভিডিও পাঠানো
      await api.sendMessage({
        body: "🥵🥵💦",
        attachment: await global.utils.getStreamFromURL(videoUrl),
      }, threadID);

    } catch (error) {
      console.error("Error sending random video:", error);
      api.sendMessage("⚠️ ভিডিও পাঠাতে সমস্যা হয়েছে, পরে চেষ্টা করুন।", event.threadID, event.messageID);
    }
  }
};
