module.exports = {
 config: {
	 name: "🥰",
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
 if (event.body && event.body.toLowerCase() === "🥰") {
 return message.reply({
 body: "     「°-۵༎প্রিয়-💚🌸\n\n❥︎シ︎মানুষটার ༎কথা ভাবতে༎ভাবতে༎হঠাৎ༎ হেসে ফেলার༎\n\nঅনুভূতি টা ༎বড্ড༎ভালো༎লাগে 🥰🌼•༎࿐\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n\n\n☆RAFI☆\n____Ayan ッ」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/JNHVyYl.mp4")
 });
 }
 }
}
