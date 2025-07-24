const axios = require("axios");

module.exports.config = {
  name: "jannat",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "Talk to Ana",
  prefix: true,
  category: "sim simi fun",
  usages: "mini",
  cooldowns: 5,
  dependencies: {}
};

module.exports.handleEvent = async function ({ api, event }) {
  const { body, messageID, threadID } = event;
  if (!body) return;

  const key = body.split(/\s+/)[0].toLowerCase();
  if (key !== "jannat") return;

  const args = body.trim().split(/\s+/).slice(1);
  if (!args.length) return api.sendMessage("hm bolo bby😸 ...", threadID, messageID);

  const message = encodeURIComponent(args.join(" "));
  try {
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${message}&filter=true`);
    if (res.data.error) {
      return api.sendMessage(`Error: ${res.data.error}`, threadID, messageID);
    }
    return api.sendMessage(res.data.success, threadID, messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚝𝚝𝚒𝚗𝚐 𝙳𝚊𝚝𝚊𝚋𝚊𝚜𝚎, 𝚜𝚘𝚛𝚛𝚢 𝚋𝚊𝚋𝚎 🥺", threadID, messageID);
  }
};

module.exports.run = async function () {
  // run এ কি দরকার নেই, সেটা আলাদা handleEvent এ কাজ হয়
};
