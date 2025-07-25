const axios = require("axios");

module.exports = {
  config: {
    name: "spy2",
    aliases: ["whoishe", "whoisshe", "whoami", "stalk"],
    version: "2.0",
    role: 0,
    author: "xnil6x",
    description: "Get detailed user information with elegant presentation",
    category: "information",
    countDown: 5,
  },

  onStart: async function({ event, message, usersData, api, args }) {
    let targetUID;
    const senderID = event.senderID;

    // টার্গেট UID নির্ধারণ
    if (args[0]) {
      if (/^\d+$/.test(args[0])) { // যদি সরাসরি UID দেয়
        targetUID = args[0];
      } else { // যদি profile.php লিংক দেয়
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) targetUID = match[1];
      }
    }

    // যদি আর্গুমেন্ট না থাকে, রিপ্লাই বা মেনশন চেক করো, না হলে নিজের ID নাও
    targetUID = targetUID || (event.type === "message_reply" ? event.messageReply.senderID : Object.keys(event.mentions || {})[0] || senderID);

    if (!targetUID) {
      return message.reply("দয়া করে একজন ব্যবহারকারীকে ট্যাগ করুন, একটি বার্তার উত্তর দিন, অথবা একটি UID প্রদান করুন।");
    }

    try {
      // ইউজারের তথ্য আনা
      const userInfo = await api.getUserInfo(targetUID);
      const user = userInfo[targetUID]; // getUserInfo একটি অবজেক্ট রিটার্ন করে

      if (!user) {
        return message.reply("এই ইউজারের তথ্য পাওয়া যায়নি।");
      }

      // Avatar URL আনা (global.utils.getStreamFromURL ব্যবহার করা হয়েছে)
      const avatarStream = await global.utils.getStreamFromURL(`https://graph.facebook.com/${targetUID}/picture?width=720&height=720`);

      // ব্যবহারকারীর ডেটা (যদি usersData.get() কাজ করে)
      let userDataLocal = {};
      try {
        userDataLocal = await usersData.get(targetUID) || {};
      } catch (e) {
        console.warn("Could not fetch user data from usersData.get:", e);
      }

      // সব ইউজারের ডেটা আনা (র্যাঙ্ক ক্যালকুলেশনের জন্য)
      let allUsersData = [];
      try {
        allUsersData = await usersData.getAll() || [];
      } catch (e) {
        console.warn("Could not fetch all users data from usersData.getAll:", e);
      }

      const genderMap = {
        1: "♀️ Girl",
        2: "♂️ Boy",
        undefined: "🌈 Custom" // Facebook API তে gender 1 (Female), 2 (Male) হয়, বাকিটা Custom ধরে নেওয়া
      };

      const formatMoney = num => {
        if (isNaN(num)) return "0";
        const units = ["", "K", "M", "B", "T"];
        let unit = 0;
        while (num >= 1000 && unit < units.length - 1) {
          num /= 1000;
          unit++;
        }
        return num.toFixed(1).replace(/\.0$/, "") + units[unit];
      };

      const getRank = (id, key, allUsers) => {
        const sorted = [...allUsers].sort((a, b) => (b[key] || 0) - (a[key] || 0));
        const rank = sorted.findIndex(u => u.userID === id);
        return rank !== -1 ? rank + 1 : "N/A";
      };

      const stats = {
        money: userDataLocal.money || 0,
        exp: userDataLocal.exp || 0,
        rank: getRank(targetUID, 'exp', allUsersData),
        moneyRank: getRank(targetUID, 'money', allUsersData)
      };

      const createBox = (title, items) => {
        let box = `╭─── ✦ ${title} ✦ ───\n`;
        items.forEach(([key, value]) => {
          box += `├─ ${key}: ${value}\n`;
        });
        box += `╰─────────────────`;
        return box;
      };

      const profileBox = createBox("PROFILE", [
        ["🎭 Name", user.name || "N/A"],
        ["🧬 Gender", genderMap[user.gender] || "Unknown"],
        ["🆔 UID", targetUID],
        ["👑 Status", user.type?.toUpperCase() || "Regular User"],
        ["🏷️ Username", user.vanity || "None"],
        ["🎂 Birthday", user.isBirthday ? "✅ Has Birthday" : "❌ No Birthday info"],
        ["💫 Nickname", user.alternateName || "None"],
        ["🤖 Bot Friend", user.isFriend ? "✅ Yes" : "❌ No"]
      ]);

      const statsBox = createBox("STATISTICS", [
        ["💰 Money", `$${formatMoney(stats.money)}`],
        ["⭐ Experience", stats.exp],
        ["🏆 Rank", stats.rank !== "N/A" ? `#${stats.rank}/${allUsersData.length}` : "N/A"],
        ["💎 Wealth Rank", stats.moneyRank !== "N/A" ? `#${stats.moneyRank}/${allUsersData.length}` : "N/A"]
      ]);

      const profileUrl = `🌐 Profile: ${user.profileUrl || "N/A"}`;

      await message.reply({
        body: `${profileBox}\n\n${statsBox}\n\n${profileUrl}`,
        attachment: avatarStream
      });

    } catch (error) {
      console.error("Spy Command Error:", error);
      message.reply("🔍 এই ইউজারের উপর স্পাই করা সম্ভব হয়নি। সম্ভবত সে অদৃশ্য হয়ে গেছে অথবা কোনো ভুল হয়েছে।");
    }
  }
};
         
