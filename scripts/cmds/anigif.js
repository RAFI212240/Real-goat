const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "anigif",
    version: "1.2",
    author: "kshitiz (Modified)",
    role: 0,
    category: "Fun",
    shortDescription: "Send anime gifs based on tag",
    longDescription: "Bot sends anime gifs according to the given tag.",
    guide: {
      en: "{pn} <tag> or just {pn} to see tag list"
    }
  },

  onStart: async function({ api, args, message, event }) {
    try {
      const availableTags = [
        "bite", "blush", "comfy", "cry", "cuddle", "dance", "eevee","fluff","holo","hug","icon","kiss","kitsune","lick","neko","okami",
        "pat","poke","senko","sairo","slap","smile","tail","tickle",
        // NSFW tags:
        "anal", "blowjob","cum","fuck","pussylick","solo",
        "threesome_fff","threesome_ffm","threesome_mmf","yaio","yuri"
      ];

      const nsfwTags = [
        "anal", "blowjob", "cum", "fuck", "pussylick", "solo",
        "threesome_fff", "threesome_ffm", "threesome_mmf", "yaio", "yuri"
      ];

      // যদি no args হয়, tag list দেখাও
      if (args.length === 0) {
        return message.reply(`Available tags:\n${availableTags.slice(0,25).join(", ")}` + `\n\nFor NSFW tags, type command in approved groups.`);
      }

      const tag = args[0].toLowerCase();

      if (!availableTags.includes(tag)) {
        return message.reply(`Invalid tag "${tag}".\nAvailable tags:\n${availableTags.slice(0,25).join(", ")}\n\nNSFW tags are hidden for restricted groups.`);
      }

      // Permission check for NSFW tags
      const approvedIds = JSON.parse(await fs.readFile(path.join(__dirname, "assist_json", "approved_ids.json"), "utf8"));
      const bypassIds = JSON.parse(await fs.readFile(path.join(__dirname, "assist_json", "bypass_id.json"), "utf8"));
      const senderId = event.senderID;

      if(nsfwTags.includes(tag) && !bypassIds.includes(senderId) && !approvedIds.includes(event.threadID)) {
        const msg = await message.reply("⚠️ This NSFW tag is not allowed in your group.\nType /requestNSFW to request permission.");
        setTimeout(() => message.unsend(msg.messageID).catch(() => {}), 90000);
        return;
      }

      // API Endpoint নির্বাচন
      const endpoint = nsfwTags.includes(tag)
        ? `https://purrbot.site/api/img/nsfw/${tag}/gif`
        : `https://purrbot.site/api/img/sfw/${tag}/gif`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        return message.reply("Failed to fetch GIF from API.");
      }

      const data = await response.json();

      if (!data.link) {
        return message.reply("Sorry, no GIF found for this tag.");
      }

      const gifUrl = data.link;
      const tempGifPath = path.join(__dirname, `${tag}_anime.gif`);

      // GIF ডাউনলোড
      const gifResponse = await fetch(gifUrl);
      if (!gifResponse.ok) {
        return message.reply("Failed to download GIF.");
      }
      const buffer = await gifResponse.buffer();
      await fs.writeFile(tempGifPath, buffer);

      // মেসেজ পাঠানো
      await message.reply({
        body: `Here is your anime gif for tag: ${tag} 😗👇`,
        attachment: fs.createReadStream(tempGifPath)
      });

      // আর্টিফ্যাক্ট ক্লিনআপ
      await fs.unlink(tempGifPath);

    } catch (error) {
      console.error("Error in anigif command:", error);
      message.reply("An error occurred while processing your request.");
    }
  }
};
  
