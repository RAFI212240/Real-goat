module.exports = {
 config: {
	 name: "🫦",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 2,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "🫦") {
 return message.reply({
 body: "     「জানো না,,,,\nথুথু দিয়ে ঢুকাতে হয়💦🤤\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n☆RAFI☆\n\nayan ッ」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/niB2smX.mp4")
 });
 }
 }
}
