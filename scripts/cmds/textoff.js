const globalData = global.botData || (global.botData = {});

module.exports = {
  config: {
    name: "textoff",
    version: "1.3",
    description: "Command to turn on/off chat with exempt users",
    guide: {
      en: "{pn} on|off|exemptadd|exemptremove <uid>"
    },
    category: "utility",
    countDown: 15,
    role: 1,
    author: "Cliff (Modified)"
  },

  onStart: async function ({ message, args, role, getLang }) {
    if (args.length === 0) return message.reply("Please specify `on`, `off`, `exemptadd` or `exemptremove` command.");

    const cmd = args[0].toLowerCase();

    if (cmd === "on") {
      if (role < 1) return message.reply(getLang("onlyAdmin"));
      globalData.chatEnabled = true;
      return message.reply("Chat is now enabled. Members can chat freely.");
    } else if (cmd === "off") {
      if (role < 1) return message.reply(getLang("onlyAdmin"));
      globalData.chatEnabled = false;
      return message.reply("Chat is now disabled. Members who send messages will be kicked unless exempted.");
    } else if (cmd === "exemptadd") {
      if (role < 1) return message.reply(getLang("onlyAdmin"));
      const uid = args[1];
      if (!uid) return message.reply("Please provide a user ID to exempt.");
      globalData.exemptedUsers = globalData.exemptedUsers || [];
      if (globalData.exemptedUsers.includes(uid)) return message.reply("User is already exempted.");
      globalData.exemptedUsers.push(uid);
      return message.reply(`User ${uid} has been added to the exempt list.`);
    } else if (cmd === "exemptremove") {
      if (role < 1) return message.reply(getLang("onlyAdmin"));
      const uid = args[1];
      if (!uid) return message.reply("Please provide a user ID to remove from exempt list.");
      globalData.exemptedUsers = globalData.exemptedUsers || [];
      if (!globalData.exemptedUsers.includes(uid)) return message.reply("User is not in the exempt list.");
      globalData.exemptedUsers = globalData.exemptedUsers.filter(id => id !== uid);
      return message.reply(`User ${uid} has been removed from the exempt list.`);
    } else {
      return message.reply("Invalid command. Use `on`, `off`, `exemptadd <uid>`, or `exemptremove <uid>`.");
    }
  },

  onChat: async function ({ api, event, message }) {
    const chatEnabled = global.botData?.chatEnabled ?? true;
    const exemptedUsers = global.botData?.exemptedUsers || [];

    if (!chatEnabled) {
      if (exemptedUsers.includes(event.senderID)) {
        // Exempted user - do nothing
        return;
      }
      // kick user for chatting while chat off
      api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
        if (err) {
          console.error("Failed to kick user:", err);
        }
      });
      message.reply("Chat is disabled. You have been removed from the group because of messaging.");
    }
  }
};
