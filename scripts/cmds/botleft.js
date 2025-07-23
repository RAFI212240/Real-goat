const fs = require("fs-extra");

module.exports = {
  config: {
    name: "botleft",
    aliases: ["left"],
    version: "1.1",
    author: "Ullash ッ (Modified by Perplexity)",
    countDown: 5,
    role: 2,
    shortDescription: "Bot will leave the group",
    longDescription: "Bot sends a farewell message and leaves the group",
    category: "admin",
    guide: {
      en: "{p}botleft or {p}left [threadID (optional)]",
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      // যদি টিডি না দেওয়া হয় তাহলে চলতি গ্রুপ থেকে বের হবে
      const threadID = args[0] ? args[0] : event.threadID;

      // জানালে গ্রুপে বিশেষ মেসেজ পাঠাবে
      const farewellMsg = 
`▣ আমি RAFI বট, আপনাদের গ্রুপ লিভ 𝗟𝗘𝗔𝗩𝗘 নিচ্ছি।
▶ আমি আমাকে আপনাদের বিনোদন দেওয়ার জন্য বানানো হয়েছে।  
▶ যদি আমার কথায় যদি কেউ মনে কষ্ট পেয়ে থাকেন, তাহলে আমাকে ক্ষমা করে দিবেন 🙂 .\n\n🎵 ⇆ㅤ◁ㅤ ❚❚ㅤ ▷ㅤ
🎵 ধন্যবাদ, সবাই নিজের খেয়াল রাখবেন, আল্লাহ হাফেজ 🌺', 🌺`;

      await api.sendMessage(farewellMsg, threadID);
      
      // নিজেকে গ্রুপ থেকে সরানো
      const botID = await api.getCurrentUserID();
      await api.removeUserFromGroup(botID, threadID);

    } catch (error) {
      console.error("Error leaving group:", error);
      message.reply("❌ গ্রুপ থেকে সঠিকভাবে বের হওয়া যায়নি, আমি অ্যাডমিন কিনা চেক করুন।");
    }
  }
};
