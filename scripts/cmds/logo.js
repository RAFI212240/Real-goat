const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "logo",
    aliases: ["logos", "texpro"],
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "logo",
    guide: "{pn}"
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (args.length >= 2 && args[0].toLowerCase() === "list") {
      let page = parseInt(args[1]);
      switch (page) {
        case 1:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 1:\n\n
❍ aglitch ❍ Business ❍  blood\n❍ blackpink
❍ broken ❍ christmas\n❍ captainamerica
❍ carbon ❍ circuit\n❍ choror
❍ christmas ❍ discovery\n❍ devil
❍ dropwater ❍ fiction\n❍ fire ❍ glass
❍ greenhorror\n❍ imglitch ❍ layered
❍ light\n❍ magma ❍ metallic
❍ neon\n❍ skeleton ❍ sketch
❍ stone\n❍ love ❍ transformers ❍ wall\n\n
𝑷𝑨𝑮𝑬 1 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
        case 2:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 2:\n\n❍ naruto ❍ dragonfireavater\n❍ pubgavater ❍ nightstars ❍ sunlight\n❍ cloud ❍ pig ❍ caper\n❍ writestatus ❍ horror ❍ teamlogo \n❍ queen ❍ beach ❍ fbc3\n❍ tatto ❍ shirt3 ❍ oceansea\n❍ shirt4 ❍ shirt5 ❍ shirt6\n❍ lovemsg ❍ chstm ❍ christmas2\n❍ icetext ❍ butterfly ❍ coffee\n\n𝑷𝑨𝑮𝑬 2 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
        case 3:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 3:\n❍ smoke\n\n𝑷𝑨𝑮𝑬 3 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
        default:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\nInvalid page number! Please use "list 1", "list 2" or "list 3" to see available logo lists.\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
      }
    }

    if (args.length < 2) {
      return api.sendMessage(
        `╔════ஜ۩۞۩ஜ═══╗\n\nInvalid command format! Use:\nlogo list <page number>\nor\nlogo <logo name> <text>\n\n╚════ஜ۩۞۩ஜ═══╝`,
        threadID,
        messageID
      );
    }

    let type = args[0].toLowerCase();
    let text = args.slice(1).join(" ");

    // sanitize filename to avoid issues
    let safeText = text.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    const pathImg = path.join(__dirname, 'cache', `${type}_${safeText}.png`);

    let apiUrl;
    let message;

    switch (type) {
      case "glass":
        apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=4&text=${encodeURIComponent(text)}`;
        message = "Here's the [GLASS] Logo created:";
        break;
      case "business":
        apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=5&text=${encodeURIComponent(text)}`;
        message = "Here's the [BUSINESS] Logo created:";
        break;
      case "wall":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/embossed?text=${encodeURIComponent(text)}`;
        message = "Here's the [WALL] Logo created:";
        break;
      case "aglitch":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/aglitch?text=${encodeURIComponent(text)}&text2=${encodeURIComponent(text)}`;
        message = "Here's the [AGLITCH] Logo created:";
        break;
      case "berry":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/berry?text=${encodeURIComponent(text)}`;
        message = "Here's the [BERRY] Logo created:";
        break;
      case "blackpink":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/blackpink?text=${encodeURIComponent(text)}`;
        message = "Here's the [BLACKPINK] Logo created:";
        break;
      // ... add other cases as needed ...
      case "smoke":
        apiUrl = `https://api.lolhuman.xyz/api/photooxy1/smoke?apikey=0a637f457396bf3dcc21243b&text=${encodeURIComponent(text)}`;
        message = "Here's the [SMOKE] Logo created:";
        break;
      default:
        return api.sendMessage(
          `•°•°•°•°•°•°۩۞۩°•°•°•°•°•°•\n\nInvalid logo type!\nUse "list [1|2|3]" to see available logo types.\n\n•°•°•°•°•°•°۩۞۩°•°•°•°•°•°•`,
          threadID,
          messageID
        );
    }

    try {
      const response = await axios.get(apiUrl, {
        responseType: "arraybuffer"
      });
      await fs.outputFile(pathImg, Buffer.from(response.data, "binary"));

      return api.sendMessage(
        {
          attachment: fs.createReadStream(pathImg),
          body: message
        },
        threadID,
        () => fs.unlinkSync(pathImg)
      );
    } catch (err) {
      console.error(err);
      return api.sendMessage(
        `╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred while generating the logo. Please try again later.\n\n╚════ஜ۩۞۩ஜ═══╝`,
        threadID,
        messageID
      );
    }
  }
};
