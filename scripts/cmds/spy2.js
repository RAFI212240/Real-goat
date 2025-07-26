const axios = require("axios");

module.exports = {
  config: {
    name: "spy2",
    aliases: ["in2", "sp2", "whoami2"],
    version: "2.0",
    role: 0,
    author: "Mahin",
    description: "Get detailed user information with elegant presentation",
    category: "information",
    countDown: 3,
  },

  onStart: async function ({ event, message, usersData, api, args }) {
    let uid;
    const senderID = event.senderID;
    const mentions = Object.keys(event.mentions);

    // Check args
    if (args[0]) {
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) uid = match[1];
      }
    }

    // Fallbacks
    if (!uid) {
      uid = event.type === "message_reply"
        ? event.messageReply.senderID
        : mentions[0] || senderID;
    }

    try {
      const [userInfo, avatarUrl, userData, allUsers] = await Promise.all([
        api.getUserInfo(uid),
        usersData.getAvatarUrl(uid),
        usersData.get(uid),
        usersData.getAll()
      ]);

      const info = userInfo[uid];
      const genderMap = {
        1: "♀️ Girl",
        2: "♂️ Boy",
        undefined: "🌈 Custom"
      };

      const formatMoney = (num) => {
        if (isNaN(num)) return "0";
        const units = ["", "K", "M", "B", "T"];
        let unit = 0;
        while (num >= 1000 && unit < units.length - 1) {
          num /= 1000;
          unit++;
        }
        return num.toFixed(1).replace(/\.0$/, "") + units[unit];
      };

      const getRank = (id, key) => {
        const sorted = [...allUsers].sort((a, b) => (b[key] || 0) - (a[key] || 0));
        return sorted.findIndex(u => u.userID === id) + 1;
      };

      const stats = {
        money: userData.money || 0,
        exp: userData.exp || 0,
        rank: getRank(uid, 'exp'),
        moneyRank: getRank(uid, 'money')
      };

      const createBox = (title, items) => {
        let box = `╭─── ✦ ${title} ✦ ───\n`;
        items.forEach(([key, value]) => {
          box += `├─ ${key}: ${value}\n`;
        });
        box += `╰────────────────`;
        return box;
      };

      const profileBox = createBox("PROFILE", [
        ["🎭 Name", info.name || "Unknown"],
        ["🧬 Gender", genderMap[info.gender]],
        ["🆔 UID", uid],
        ["👑 Status", (info.type || "Regular User").toUpperCase()],
        ["🏷️ Username", info.vanity || "None"],
        ["🎂 Birthday", info.isBirthday ? "Yes" : "Private"],
        ["💫 Nickname", info.alternateName || "None"],
        ["🤖 Bot Friend", info.isFriend ? "✅ Yes" : "❌ No"]
      ]);

      const statsBox = createBox("STATISTICS", [
        ["💰 Money", `$${formatMoney(stats.money)}`],
        ["⭐ Experience", stats.exp],
        ["🏆 Rank", `#${stats.rank}/${allUsers.length}`],
        ["💎 Wealth Rank", `#${stats.moneyRank}/${allUsers.length}`]
      ]);

      const profileUrl = `🌐 Profile: https://facebook.com/${info.vanity || "profile.php?id=" + uid}`;

      await message.reply({
        body: `${profileBox}\n\n${statsBox}\n\n${profileUrl}`,
        attachment: await global.utils.getStreamFromURL(avatarUrl)
      });

    } catch (err) {
      console.error("Spy Command Error:", err);
      return message.reply("🔍 Couldn't spy on this user. They might be hiding in the shadows.");
    }
  }
};
