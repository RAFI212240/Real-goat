const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "sv", // এখানে কমান্ডের একটি সঠিক নাম দিন
    version: "1.1.0",
    permission: 0,
    credits: "Nayan (Fixed by AI)",
    description: "Send random status video with a caption",
    prefix: true,
    category: "media",
    usages: "statusvideo",
    cooldowns: 10,
  },

  onStart: async function({ api, event, message }) {
    try {
      const hi = [
        "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n🐰🍒শী্ঁত্ঁ শী্ঁত্ঁ ভা্ঁব্ঁ কি্ঁসে্ঁর্ঁ জা্ঁনি্ঁ এ্ঁক্ঁটা্ঁ অ্ঁভা্ঁব্ঁ_🙊🙈\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷) ",
" === 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n  --❖-- 𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n--ღღ🦋🖤✨-\n\n--𝐋𝐨𝐯𝐞 𝐢'𝐬 𝐁𝐞𝐚𝐮𝐭𝐢𝐟𝐮𝐥 __☺️🦋✨\n\n--𝐥𝐟 𝐭𝐡𝐞 𝐥𝐨𝐯𝐞𝐝 𝐨𝐧𝐞 𝐢𝐬 𝐫𝐢𝐠𝐡𝐭..!🦋🍁💫\n\n-ভালোবাসা সুন্দর ___,🖤🦋\n\n- যদি প্রিয় মানুষটি সঠিক হয়....!☺️🖤🙂✨🌼\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷) ",
"___=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n❥◎⃝! শূন্যতায় ভাসি🙃 \n\n❥কখনো হাসি -😁💚_আবার কাঁদি!-😅\n\n❥বেলা শেষে 🌌শূন্যতায় জড়িয়ে ও পূর্ণতা খুঁজি😊❤\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻 (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖--𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n ❥»̶̶͓͓͓̽̽̽⑅⃝✺❥᭄❥\n\n___💚__পৃথিবীটা আজ...\n\nমিথ্যে মায়াতে ভরা...!💚🌺\n\n____🥀_তাই তো পৃথীবীর মানুষ আজ....!\n\nঅভিনয়ের সেরা...👎🥀\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n💜🔐🌈 ___\n\n- 𝗧𝗵𝗶𝘀 𝗮𝗯𝗼𝘂𝘁 𝗹𝗶𝗻𝗲-!! 😽🧡✨\n\n🍁_সবাই তো খুশি চায়_আর আমি প্রতিটা খুশিতে তোমাকে চাই⚜️— -!!-) 😊🖤\n\n___💜🔐🌈\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n>🐰✨𝑻𝒉𝒊𝒔 𝒍𝒊𝒏𝒆 𝒊𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖🖤🌸\n\n___চোখের দেখায় নয়,মনের দেখায় ভালবাসি!!😇✨\n\n- কাছে থাকো কিংবা দূরে,তোমাকে ভেবেই হাসি!!🖤🐰\n\n💖🦋\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n:༅༎💙🦋\n༆𝐓𝐡𝐢𝐬 𝐚𝐛𝐨𝐮𝐭 𝐥𝐢𝐧𝐞_⚠︎🙅🏻‍♂️✨\n\n😽︵۵মানুষ! হচ্ছে!বৃষ্টির!মতো!Life a ! অনেক মানুষ !আসবে!অনেক মানুষ !যাবে!💔🥰\n\n:༅༎💙🦋 সঠিক!মানুষটা!ঠিকই!ছায়া!হয়ে!পাশে!থাকবে -/ ఌ︵💚🌻\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n:(-𝙄 𝙖𝙢 𝘼𝙙𝙙𝙞𝙘𝙩𝙚𝙙 𝙏𝙤👀🙈\n\n_')𝙈𝙮 𝙁𝙖𝙫𝙤𝙧𝙞𝙩𝙚 𝙋𝙚𝙧𝙨𝙤𝙣..!\n\n🐰🦋 -(^আমি আমার প্রিয় মানুষটার প্রতি আসক্ত >!💖🔐🍭)😇\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",

"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n𝙗𝙚𝙡𝙞𝙚𝙫𝙚 𝙩𝙝𝙞𝙨 𝙡𝙞𝙣𝙚-!!🦋🐭\n\n🐰' —'পারফেক্ট' কাউকে পাবার থেকে'কাউকে' পারফেক্ট' বানিয়ে নিতে পারাটা' বড় অর্জন'--)🌼💜\n\n___🍒🖇️✨___\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n°🐹💙🍒\n\n_𝗧𝗿𝘂𝘀𝘁 𝗺e 🔐💚\n°\n\n__!!☁️✨🌺আপনাকে পাওয়ার দাবি!আমি মৃত্যুর পরও ছাড়বো না,,🔐💚 🙂\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)",

"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐀𝐥𝐢𝐟 (⁠◕⁠દ⁠◕⁠)--❖--\n✢━━━━━━━━━━━━━━━✢\n\n__𝗥𝗶𝗴𝗵𝘁 𝗽𝗲𝗼𝗽𝗹𝗲 𝗮𝗿𝗲 𝗮𝗹𝘄𝗮𝘆𝗲𝘀 𝗮𝗻𝗴𝗿𝘆 𝗯𝗲𝗰𝗮𝘂𝘀𝗲 𝘁𝗵𝗲𝘆 𝗰𝗮𝗻'𝘁 𝘀𝘁𝗮𝗻𝗱 𝘆𝗼𝘂 𝘄𝗶𝘁𝗵 𝗼𝘁𝗵𝗲𝗿𝘀🌸✨\n\n___সঠিক মানুষ সব সময়ই রাগি হয়'\n\nকারণ তারা অন্যের সাথে তোমাকে সহ্য করতে পারবে নাহ্!😌🫶🖤\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻(✷‿✷)"
      ];
      const know = hi[Math.floor(Math.random() * hi.length)];
      
      const link = [
"https://i.imgur.com/HBaXulv.mp4",
"https://i.imgur.com/iA0wpCd.mp4",
"https://i.imgur.com/J7qPrpr.mp4",
"https://i.imgur.com/b5TbJc8.mp4",
"https://i.imgur.com/Ok2BR3t.mp4",
"https://i.imgur.com/rpSDliz.mp4",
"https://i.imgur.com/ey8NJy2.mp4",
"https://i.imgur.com/qEXaIVT.mp4",
"https://i.imgur.com/i2Jj4KS.mp4",
"https://i.imgur.com/u5EvR8G.mp4",
"https://i.imgur.com/YC64kD4.mp4",
"https://i.imgur.com/1XY7gEm.mp4",
"https://i.imgur.com/Tv1DMT4.mp4",
"https://i.imgur.com/rfS4ihW.mp4",
"https://i.imgur.com/fYl4DRh.mp4",
"https://i.imgur.com/WxDW5wX.mp4",
"https://i.imgur.com/zXjPa6A.mp4",
"https://i.imgur.com/KtbfcKD.mp4",
"https://i.imgur.com/lkuN5U0.mp4",
"https://i.imgur.com/Wv85YgQ.mp4",
"https://i.imgur.com/GVE1Nbm.mp4",
"https://i.imgur.com/TobpCyu.mp4",
"https://i.imgur.com/97vEPqO.mp4",
"https://i.imgur.com/EmD9iPX.mp4",
"https://i.imgur.com/FpKdJk9.mp4",
"https://i.imgur.com/u47ToWR.mp4",
"https://i.imgur.com/6xIVvJd.mp4",
"https://i.imgur.com/xqms4ja.mp4",
"https://i.imgur.com/EqUlV7n.mp4",
"https://i.imgur.com/6WA09Vh.mp4",
"https://i.imgur.com/BBDW3Rq.mp4",
"https://i.imgur.com/P2VN5vA.mp4",
"https://i.imgur.com/J25ZSn2.mp4",
"https://i.imgur.com/KELcIRX.mp4",
"https://i.imgur.com/J25ZSn2.mp4",
"https://i.imgur.com/KELcIRX.mp4",
"https://i.imgur.com/BfksKgK.mp4",
"https://i.imgur.com/YLdLfm2.mp4",
"https://i.imgur.com/nWCXEKq.mp4",
"https://i.imgur.com/84OA0Bj.mp4", 
"https://i.imgur.com/3wYEwbI.mp4",
"https://i.imgur.com/ZUxKmxe.mp4",
"https://i.imgur.com/P1nAqzZ.mp4",
"https://i.imgur.com/GrtTCT2.mp4",
"https://i.imgur.com/pG2A3oc.mp4",
"https://i.imgur.com/ASDe8rb.mp4",
"https://i.imgur.com/0czk2iY.mp4",
"https://i.imgur.com/lgbo3Vl.mp4",
"https://i.imgur.com/KhXcUy3.mp4",
"https://i.imgur.com/W071YUz.mp4",
"https://i.imgur.com/sNujqcx.mp4",
"https://i.imgur.com/zmbIS1H.mp4",
"https://i.imgur.com/vhMJqsx.mp4",
"https://i.imgur.com/BufXEgS.mp4",
"https://i.imgur.com/ClBRcZv.mp4",
"https://i.imgur.com/EEKg4kP.mp4"
      ];
      
      const randomLink = link[Math.floor(Math.random() * link.length)];
      
      // cache ফোল্ডার আছে কিনা তা নিশ্চিত করা
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);
      
      // ইউনিক ফাইল নাম তৈরি করা
      const videoPath = path.join(cacheDir, `video_${Date.now()}.mp4`);
      
      // axios দিয়ে ভিডিও ডাউনলোড
      const videoResponse = await axios.get(randomLink, { responseType: "arraybuffer" });
      await fs.writeFile(videoPath, Buffer.from(videoResponse.data));
      
      // মেসেজ পাঠানো
      await message.reply({
        body: know,
        attachment: fs.createReadStream(videoPath)
      });
      
      // ডাউনলোড করা ফাইল কিছু সময় পর ডিলিট করা
      setTimeout(() => {
        fs.unlink(videoPath);
      }, 10000); // ১০ সেকেন্ড পর ডিলিট হবে

    } catch (error) {
      console.error("statusvideo command error:", error.message);
      message.reply("❌ দুঃখিত, এই মুহূর্তে ভিডিওটি আনা সম্ভব হচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
    }
  }
};
	      
