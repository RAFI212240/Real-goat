const fs = require('fs-extra');

module.exports.config = {
  name: "admin2",
  version: "2.0.0",
  permission: 3, // admin লেভেল 3 হওয়া উচিত যেহেতু admin control
  credits: "Nayan",
  description: "Control admin lists",
  prefix: false,
  category: "admin",
  usages: "admin [add/remove/list] [uid/mention]",
  cooldowns: 5,
};

module.exports.languages = {
  vi: {
    listAdmin: 'Danh sách toàn bộ người điều hành bot: \n\n%1',
    notHavePermssion: 'Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
    addedNewAdmin: 'Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
    removedAdmin: 'Đã gỡ bỏ %1 người điều hành bot:\n\n%2',
  },
  en: {
    listAdmin: 'Admin list:\n\n%1',
    notHavePermssion: 'You do not have permission to use "%1"',
    addedNewAdmin: 'Added %1 admin(s):\n\n%2',
    removedAdmin: 'Removed %1 admin(s):\n\n%2',
  },
};

module.exports.run = async function ({ api, event, args, Users, permission, getText }) {
  const { threadID, messageID, mentions } = event;
  const { configPath } = global.client;
  const { ADMINBOT } = global.config;
  const mentionIDs = Object.keys(mentions);
  delete require.cache[require.resolve(configPath)];
  let config = require(configPath);

  if (!args.length) return global.utils.throwError(this.config.name, threadID, messageID);

  const command = args[0].toLowerCase();
  const content = args.slice(1);

  switch (command) {
    case "list":
    case "all":
    case "-a": {
      const listAdmin = ADMINBOT || config.ADMINBOT || [];
      let msg = [];
      for (const idAdmin of listAdmin) {
        if (idAdmin) {
          const name = await Users.getNameUser(idAdmin).catch(() => "Unknown");
          msg.push(`name: ${name}\nid: ${idAdmin}`);
        }
      }
      return api.sendMessage(getText("listAdmin", msg.join("\n\n")), threadID, messageID);
    }

    case "add": {
      if (permission != 3) return api.sendMessage(getText("notHavePermssion", command), threadID, messageID);
      let addedList = [];

      if (mentionIDs.length > 0 && isNaN(content[0])) {
        for (const id of mentionIDs) {
          if (!ADMINBOT.includes(id)) {
            ADMINBOT.push(id);
            config.ADMINBOT.push(id);
            addedList.push(`${id} - ${event.mentions[id]}`);
          }
        }
      } else if (content.length > 0 && !isNaN(content[0])) {
        if (!ADMINBOT.includes(content[0])) {
          ADMINBOT.push(content[0]);
          config.ADMINBOT.push(content[0]);
          const name = await Users.getNameUser(content[0]).catch(() => "Unknown");
          addedList.push(`name: ${name}\nuid: ${content[0]}`);
        }
      } else {
        return global.utils.throwError(this.config.name, threadID, messageID);
      }

      await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
      return api.sendMessage(getText("addedNewAdmin", addedList.length, addedList.join("\n").replace(/@/g, "")), threadID, messageID);
    }

    case "remove":
    case "rm":
    case "delete": {
      if (permission != 3) return api.sendMessage(getText("notHavePermssion", command), threadID, messageID);
      let removedList = [];

      if (mentionIDs.length > 0 && isNaN(content[0])) {
        for (const id of mentionIDs) {
          const index = config.ADMINBOT.indexOf(id);
          if (index !== -1) {
            ADMINBOT.splice(index, 1);
            config.ADMINBOT.splice(index, 1);
            removedList.push(`${id} - ${event.mentions[id]}`);
          }
        }
      } else if (content.length > 0 && !isNaN(content[0])) {
        const index = config.ADMINBOT.findIndex(item => item.toString() === content[0]);
        if (index !== -1) {
          ADMINBOT.splice(index, 1);
          config.ADMINBOT.splice(index, 1);
          const name = await Users.getNameUser(content[0]).catch(() => "Unknown");
          removedList.push(`name: ${name}\nuid: ${content[0]}`);
        }
      } else {
        return global.utils.throwError(this.config.name, threadID, messageID);
      }

      await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
      return api.sendMessage(getText("removedAdmin", removedList.length, removedList.join("\n").replace(/@/g, "")), threadID, messageID);
    }

    default: {
      return global.utils.throwError(this.config.name, threadID, messageID);
    }
  }
};
