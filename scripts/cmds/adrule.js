module.exports = {
  config: {
    name: "adrule",
    aliases: ["adrule"],
    version: "1.1",
    author: "AceGun x Samir Œ (Modified)",
    countDown: 5,
    role: 0,
    shortDescription: "Admin add/remove and custom message",
    longDescription: "Add or remove admin in group or send a custom message",
    category: "owner",
    guide: "adrule add|remove|msg [@mention / text]",
  },

  onStart: async function({ message, api, event, args }) {
    const permission = ["100090895866311"]; // যারা ব্যবহার করতে পারবে
    if (!permission.includes(event.senderID))
      return message.reply("আপনার অনুমতি নেই বাট, 😡");

    const subcmd = args[0]?.toLowerCase();
    if (!subcmd || !["add", "remove", "msg"].includes(subcmd))
      return message.reply("পছন্দ করুন: add, remove, অথবা msg\nUsage: respect add @user");

    const threadID = event.threadID;

    if (subcmd === "add") {
      const mention = Object.keys(event.mentions);
      if (!mention.length) return message.reply("RAFi Bbz mention deo 🫣");
      try {
        await api.changeAdminStatus(threadID, mention[0], true);
        return message.reply("You Are Now Admin In This Group। 😙");
      } catch (e) {
        console.error(e);
        return message.reply("I cant Add You As An Admin In This Group. 😓");
      }
    }

    if (subcmd === "remove") {
      const mention = Object.keys(event.mentions);
      if (!mention.length) return message.reply("আপনি কাউকে মেনশন করেননি!");
      try {
        await api.changeAdminStatus(threadID, mention[0], false);
        return message.reply("You have been removed from admin.!");
      } catch (e) {
        console.error(e);
        return message.reply("I cant Add You As An Admin In This Group।");
      }
    }

    if (subcmd === "msg") {
      const customMsg = args.slice(1).join(" ");
      if (!customMsg) return message.reply("পাঠানোর জন্য একটি মেসেজ লিখুন!");
      return message.reply(customMsg);
    }
  }
};
