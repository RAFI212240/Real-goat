const { writeFileSync } = require("fs-extra");

module.exports = {
    config: {
        name: "permission",
        aliases: ["own"],
        version: "1.1",
        author: "♡︎ 𝐻𝐴𝑆𝐴𝑁 ♡︎",
        countDown: 5,
        role: 2,
        category: "owner",
        guide: {
            en: "   {pn} [add | -a] <uid | @tag>: Add owner role for a user\n" +
                "   {pn} [remove | -r] <uid | @tag>: Remove owner role from a user\n" +
                "   {pn} [add | -a] (reply): Add owner role for the user you replied to"
        }
    },

    langs: {
        en: {
            added: "✅ | Added owner role for %1 users:\n%2",
            alreadyAdmin: "\n⚠️ | %1 users already have owner role:\n%2",
            missingIdAdd: "⚠️ | Please provide an ID, tag a user, or reply to a message to add owner role",
            removed: "✅ | Removed owner role from %1 users:\n%2",
            notAdmin: "⚠️ | %1 users do not have owner role:\n%2",
            missingIdRemove: "⚠️ | Please provide an ID, tag a user, or reply to a message to remove owner role",
            noPermission: "Permission dewar tui ke bey? 🐸✌️",
            invalidCommand: "⚠️ | Invalid command! Use 'add' or 'remove'."
        }
    },

    onStart: async function ({ message, args, usersData, event, getLang, api }) {
        const config = global.GoatBot.config;
        
        // Owner permission check
        if (!config.owner || !config.owner.includes(event.senderID)) {
            return api.sendMessage(getLang("noPermission"), event.threadID, event.messageID);
        }

        // Initialize owner array if it doesn't exist
        if (!config.owner) {
            config.owner = [];
        }

        switch (args[0]) {
            case "add":
            case "-a": {
                let uids = [];

                // Get UIDs from mentions, reply, or arguments
                if (Object.keys(event.mentions || {}).length > 0) {
                    uids = Object.keys(event.mentions);
                } else if (event.messageReply) {
                    uids.push(event.messageReply.senderID);
                } else {
                    uids = args.slice(1).filter(arg => !isNaN(arg));
                }

                if (uids.length === 0) {
                    return message.reply(getLang("missingIdAdd"));
                }

                const newAdmins = [];
                const alreadyAdmins = [];

                for (const uid of uids) {
                    if (config.owner.includes(uid)) {
                        alreadyAdmins.push(uid);
                    } else {
                        newAdmins.push(uid);
                        config.owner.push(uid);
                    }
                }

                // Save config
                writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

                // Get names
                const newAdminNames = await Promise.all(
                    newAdmins.map(async uid => {
                        try {
                            return await usersData.getName(uid) || uid;
                        } catch {
                            return uid;
                        }
                    })
                );

                const alreadyAdminNames = await Promise.all(
                    alreadyAdmins.map(async uid => {
                        try {
                            return await usersData.getName(uid) || uid;
                        } catch {
                            return uid;
                        }
                    })
                );

                let replyMsg = "";
                if (newAdmins.length > 0) {
                    replyMsg += getLang("added", newAdmins.length, newAdminNames.map(name => `• ${name}`).join("\n"));
                }
                if (alreadyAdmins.length > 0) {
                    replyMsg += getLang("alreadyAdmin", alreadyAdmins.length, alreadyAdminNames.map(name => `• ${name}`).join("\n"));
                }

                return message.reply(replyMsg);
            }

            case "remove":
            case "-r": {
                let uids = [];

                // Get UIDs from mentions, reply, or arguments
                if (Object.keys(event.mentions || {}).length > 0) {
                    uids = Object.keys(event.mentions);
                } else if (event.messageReply) {
                    uids.push(event.messageReply.senderID);
                } else {
                    uids = args.slice(1).filter(arg => !isNaN(arg));
                }

                if (uids.length === 0) {
                    return message.reply(getLang("missingIdRemove"));
                }

                const removedAdmins = [];
                const notAdmins = [];

                for (const uid of uids) {
                    const index = config.owner.indexOf(uid);
                    if (index !== -1) {
                        removedAdmins.push(uid);
                        config.owner.splice(index, 1);
                    } else {
                        notAdmins.push(uid);
                    }
                }

                // Save config
                writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

                // Get names
                const removedAdminNames = await Promise.all(
                    removedAdmins.map(async uid => {
                        try {
                            return await usersData.getName(uid) || uid;
                        } catch {
                            return uid;
                        }
                    })
                );

                const notAdminNames = await Promise.all(
                    notAdmins.map(async uid => {
                        try {
                            return await usersData.getName(uid) || uid;
                        } catch {
                            return uid;
                        }
                    })
                );

                let replyMsg = "";
                if (removedAdmins.length > 0) {
                    replyMsg += getLang("removed", removedAdmins.length, removedAdminNames.map(name => `• ${name}`).join("\n"));
                }
                if (notAdmins.length > 0) {
                    replyMsg += getLang("notAdmin", notAdmins.length, notAdminNames.map(name => `• ${name}`).join("\n"));
                }

                return message.reply(replyMsg);
            }

            default: {
                return message.reply(getLang("invalidCommand"));
            }
        }
    }
};
                
