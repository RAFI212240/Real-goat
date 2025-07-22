const accounts = [];

function generateAccount(email, password) {
	return `
🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸

🦋 𝓕𝓪𝓬𝓮𝓑𝓸𝓸𝓴 𝓢𝓽𝓸𝓬𝓴 𝓐𝓬𝓬𝓸𝓾𝓷𝓽 🦋

💌 𝓔𝓶𝓪𝓲𝓵 : ${email}

🔑 𝓟𝓪𝓼𝓼𝔀𝓸𝓻𝓭 : ${password}

🌸 Stay Safe, Stay home🌸
🌺 𝓕𝓻𝓸𝓶 𝓐𝓷𝓲𝓶𝓮 𝓦𝓸𝓻𝓵𝓭 🌺

🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸
	`;
}

module.exports = {
	config: {
		name: "fbaccount",
		aliases: ["fbacc"],
		author:"?/zed", // Convert By Goatbot Zed
		role: 2,
		shortDescription: "Facebook Stock Accounts",
		longDescription: "Manage Facebook Stock Accounts",
		category: "Tools 🛠️",
		guide: "{pn} add <email> <password> | get | list"
	},

	onStart: async function ({ api, event, args, message }) {
		const action = args[0];

		if (!action) {
			return message.reply("Usage:\n#fbacc add <email> <password>\n#fbacc get\n#fbacc list");
		}

		if (action === "get") {
			if (accounts.length > 0) {
				const { email, password } = accounts.shift();
				api.sendMessage(generateAccount(email, password), event.threadID, event.messageID);
			} else {
				api.sendMessage("📭 No account available.।", event.threadID, event.messageID);
			}
		} else if (action === "add") {
			const email = args[1];
			const password = args[2];
			if (email && password) {
				accounts.push({ email, password });
				api.sendMessage("✅ Account added to stock।", event.threadID, event.messageID);
			} else {
				api.sendMessage("❌ সঠিক ব্যবহার: #fbacc add <email> <password>", event.threadID, event.messageID);
			}
		} else if (action === "list") {
			api.sendMessage(`📋Total number of accounts in stock: ${accounts.length}`, event.threadID, event.messageID);
		} else {
			api.sendMessage("❌ ভুল কমান্ড। ব্যবহার:\n#fbacc add <email> <password>\n#fbacc get\n#fbacc list", event.threadID, event.messageID);
		}
	},
};
