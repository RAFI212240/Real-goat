const videoLinks = [
"https://drive.google.com/uc?export=download&id=1zgn8EqLKbzCdm9vOCMNJkJg7j4TeYxM_",
			"https://drive.google.com/uc?export=download&id=1zcT3VP2ieQYFFE6jp3s9fE-2a3HVowHH",
			"https://drive.google.com/uc?export=download&id=1yrQPcV1lYUdwHhWgZ_qn3xP5WvsJCFMS",
			"https://drive.google.com/uc?export=download&id=1yOGY1XJs1hUfaHJqm0YktT3t8S-LV8Ty",
			"https://drive.google.com/uc?export=download&id=1xPxhMbDI1UCtg8pRFV0CvbqitZ1JekES",
			"https://drive.google.com/uc?export=download&id=1xJ_gJr3ZVkGyS0BLxAA6tyIWrFUBl-Q4",
			"https://drive.google.com/uc?export=download&id=1wAawROZ6sXDMU1q8a4b3jNJiIpDgeb_D",
			"https://drive.google.com/uc?export=download&id=1w8ESLhu3PuzmrFi99WK0VV8cDmn6mxy9",
			"https://drive.google.com/uc?export=download&id=1w0lydWDNLqJUlRDKKX36O_01D9m-EjC0",
			"https://drive.google.com/uc?export=download&id=1vzQcgjgdOe9iahPdN7AXFcC31VbqdXMf",
			"https://drive.google.com/uc?export=download&id=1vtIjF18wSg_RHr9aeGsjzLgcIjEpEoqN",
			"https://drive.google.com/uc?export=download&id=1vrGryOqznkcgHyuk62_hIzMfPQy2tWyA",
			"https://drive.google.com/uc?export=download&id=1vF7d2nJ6gxifx3Oc-g81R7qMsRxCyopS",
			"https://drive.google.com/uc?export=download&id=1uodmaJd91fPQ0AgiUasttCmxpB8JDdpK",
			"https://drive.google.com/uc?export=download&id=1un3x4VIl-9obcRvJkadNHsLtpRiZFqOw",
			"https://drive.google.com/uc?export=download&id=1udLme09-Y74b-PmVD_fYQcPwq9P-Cxbb",
			"https://drive.google.com/uc?export=download&id=1tyHaXzs_Vx5cSif8eTFZsepTE42TkEth",
			"https://drive.google.com/uc?export=download&id=1twDqdlWakp4BMPK1s_F36L0JIIhMnFCF",
			"https://drive.google.com/uc?export=download&id=1tw7QvCXYxSKZIlCSiMweGaj6ueHesoAV",
			"https://drive.google.com/uc?export=download&id=1tQ7X9uov0qBtZRJT_LBMCAO0pPVe37Nt",
			"https://drive.google.com/uc?export=download&id=1tDEuhrDxeqz67XF03Easc3AwIRVDY5pK",
			"https://drive.google.com/uc?export=download&id=1t2og_RMNXUNlKDQ8S5PVtF7G8lQ3KzxX",
			"https://drive.google.com/uc?export=download&id=1t0wlz6PPcnnvuESQhQquYLq5Bfhdvb_m",
			"https://drive.google.com/uc?export=download&id=1sJ-ZJ9QIPZaiykL6MGKu5r9ZJkpyJc5d",
			"https://drive.google.com/uc?export=download&id=1sCaPnF1YWCiESsoOIrzZSf2IZCdsIdtV",
			"https://drive.google.com/uc?export=download&id=1rtiVVyZuyMi-THlE70dlyo9V5IGAZp7i",
			"https://drive.google.com/uc?export=download&id=1rs17kAoVqEWtyVelBSxyxwjkdhk_yqbS",
			"https://drive.google.com/uc?export=download&id=1rXQX7SLoj9DfBTEvNORU1i56yMntN0ia",
			"https://drive.google.com/uc?export=download&id=1rLjzOdzpv8QwmRU-2LbMixtl94R3HX_6",
			"https://drive.google.com/uc?export=download&id=1r1KQjfaGdAQPcL0O7wS4c9mBX-4XH2cs",
			"https://drive.google.com/uc?export=download&id=1qk-taR7Jc3w_iEw4yK4fVl9JsGG4TWLW",
			"https://drive.google.com/uc?export=download&id=1qYdAsy1NAtFBHDnaj04X-agJzslTXjYy",
			"https://drive.google.com/uc?export=download&id=1qG5r5Q6U6i-hKvIHqpU9yGmoZi6feb3v",
			"https://drive.google.com/uc?export=download&id=1pc_DiMZO1bolEQ5nAoMkGUsJ_-ttM82l",
			"https://drive.google.com/uc?export=download&id=1pVc1rGuB8wrwGv7BgJbN8qXMJhiCeChO",
			"https://drive.google.com/uc?export=download&id=1p2n5kXlPoU72E6YW9eXHilPtuqnG-w6C",
			"https://drive.google.com/uc?export=download&id=1osZ3s7_s2owZxISnM9c84DRYkLS-5bWT",
			"https://drive.google.com/uc?export=download&id=1nTcT8l7AQE5d21_fLF0ni8LO2ebmM1u9",
			"https://drive.google.com/uc?export=download&id=1nECmpEg1J2yIFem7rZqQmuMSquvrvYV_",
			"https://drive.google.com/uc?export=download&id=1mSWF2LSQdsmxxgermoCSy-9oVINFdE6i",
			"https://drive.google.com/uc?export=download&id=1mR6oOhg0QyufpVfB2da73jxUU9dBPwqs",
			"https://drive.google.com/uc?export=download&id=1mN8phGXPc7jOaZHJb5RFaUCK7pPdzS8B",
			"https://drive.google.com/uc?export=download&id=1mCOfefKrpxeaknBkjzBtj3UitZzISY0S",
			"https://drive.google.com/uc?export=download&id=1lsAy8CgYNcv5aLrPf4Q_tD7e9Tfh-voC",
			"https://drive.google.com/uc?export=download&id=1li2eTqIU_6LomKhxb156-RC3X4os3V5q",
			"https://drive.google.com/uc?export=download&id=1kZZnXlW5xMAQpmaWsc3Z4bA36zKQyfCz",
			"https://drive.google.com/uc?export=download&id=1k6la21wsy3_KJGOu8RKyp-8bPJaXr4Tj",
			"https://drive.google.com/uc?export=download&id=1jhqjE616AL5WSMTKjZN6zzeB4hVlr0oP",
			"https://drive.google.com/uc?export=download&id=1jYkjxq_uwhnvsDnFO9QEAhkSlH6_TGUK",
			"https://drive.google.com/uc?export=download&id=1jDa9Mldx7TlkOw7Jdc36KTF7DpIamSwy",
			"https://drive.google.com/uc?export=download&id=1iw3l-eJh9DymutufSay0Z0d2IqvNXSD4",
			"https://drive.google.com/uc?export=download&id=1ieyaB3Dlr_fOf2ihKVD13YrMHiv_bqNe",
			"https://drive.google.com/uc?export=download&id=1i7iUj1druzVKu93xqFkmTjmZTaXMMEES",
			"https://drive.google.com/uc?export=download&id=1hh83e-SWfWuvzXPo4FePvDyOTNOsao_8",
			"https://drive.google.com/uc?export=download&id=1gpEQga__aFID0luhrjOUkbmq8DqnMbQh",
			"https://drive.google.com/uc?export=download&id=1gCe3yfK21oM-X0lL7ZnbWmerXWD_-tNO",
			"https://drive.google.com/uc?export=download&id=1g2YKToFX4mxy-HlY1Xw60gAs3LVWAYFS",
			"https://drive.google.com/uc?export=download&id=11hCS5c0v-_OG7r5NjJOVGhZ0cabIu5m2",
			"https://drive.google.com/uc?export=download&id=1feu0cFCzJ05CTR6CnoUYuVXaWEDhf2eM",
			"https://drive.google.com/uc?export=download&id=1eMrdl1Y2xjOkdM_tzM4Oudo6TCYXeBvr",
			"https://drive.google.com/uc?export=download&id=1eEmPf1z1Gk5jAd-16B6Wbf3OalWAZKIH",
			"https://drive.google.com/uc?export=download&id=1dJPDnJH3_fUHY-Q1zU2miHQb7lHDna8u",
			"https://drive.google.com/uc?export=download&id=1ctZmqgBwkqyLFFfNmemU-3cRKWdrnWd7",
			"https://drive.google.com/uc?export=download&id=1bXwmk9EhNW7ICN0Aj_665ZyfmoId1HYz",
			"https://drive.google.com/uc?export=download&id=1bW0EG_wb_9sihifn9CktRfLADe98VfBE",
			"https://drive.google.com/uc?export=download&id=1bVQvY4abfs9vVR3QzJy2L-2XhviF1n2n",
			"https://drive.google.com/uc?export=download&id=1bGa8ugfYydy2VfBgMMqU7aVhlu2fdhQ3",
			"https://drive.google.com/uc?export=download&id=1ahM2OUubpPxWwo3l9s0oowhfpkU6DEAK",
			"https://drive.google.com/uc?export=download&id=1aQdBIaDXV4Mmu-g8eciQL-oayL6WjCUD",
			"https://drive.google.com/uc?export=download&id=1aLlLvgoWsvC9LhuNAHj1_yNDZIIWl1_w",
			"https://drive.google.com/uc?export=download&id=1aAd9MmQAc8LWhw8jwM3IHktmzK_zqsY3",
			"https://drive.google.com/uc?export=download&id=1_cSEFMwC9Ja9m-F_K8FbYnu0M3BxY81P",
			"https://drive.google.com/uc?export=download&id=1_R_1CWtoT37ZfNt_kIo5YzYJOosTIWhe",
			"https://drive.google.com/uc?export=download&id=1_CX1XryWqa5j07Paw-DivjhBo3m-lTYi",
			"https://drive.google.com/uc?export=download&id=1ZdYxP47it3o2DclzXanukCBpYM7X6ZYt",
			"https://drive.google.com/uc?export=download&id=1Z_pB7Z4P6MlidOEwWLjfAWRvbqCRf9Zu",
			"https://drive.google.com/uc?export=download&id=1YeUQOuIAJeAx5NCFKa4k4ZlgC6Vq573K",
			"https://drive.google.com/uc?export=download&id=1YLhaNLgAJbLXJZk1v7o8zJX4FWXZzt5g",
			"https://drive.google.com/uc?export=download&id=1X3aIx3xqp_cIMW7xXdT550axCIlPh567",
			"https://drive.google.com/uc?export=download&id=1X073GietO1CDwzcgGlgY7fX0kiLn4HGj",
			"https://drive.google.com/uc?export=download&id=1WGG04nMz3vxqHo9-uAbw8frKSF8lKdvb",


  // বাকী লিংকগুলো এখানে যোগ করো
];

global.sentVideosForKda3 = global.sentVideosForKda3 || [];

module.exports = {
  config: {
    name: "kda2",
    aliases: ["kda2"],
    version: "3.1",
    author: "kshitiz",
    countDown: 30,
    role: 2,
    shortDescription: "Send one random kanda video (no on/off)",
    longDescription: "",
    category: "𝟭𝟴+",
    guide: "{p}{n} - Send one random video"
  },

  onStart: async function({ api, event }) {
    try {
      const threadID = event.threadID;

      // ভিডিও লিঙ্কগুলোর মধ্যে যা আগে পাঠানো হয় নি
      let availableVideos = videoLinks.filter(v => !global.sentVideosForKda3.includes(v));

      // সব ভিডিও শেষ হলে লিস্ট রিসেট
      if (availableVideos.length === 0) {
        global.sentVideosForKda3 = [];
        availableVideos = [...videoLinks];
      }

      // র‌্যান্ডম ভিডিও সিলেক্ট
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      const videoUrl = availableVideos[randomIndex];

      // সেন্ট লিস্টে যোগ করা
      global.sentVideosForKda3.push(videoUrl);

      // ভিডিও পাঠানো
      await api.sendMessage({
        body: "🥵🥵💦",
        attachment: await global.utils.getStreamFromURL(videoUrl),
      }, threadID);

    } catch (error) {
      console.error("Error sending random video:", error);
      api.sendMessage("⚠️ ভিডিও পাঠাতে সমস্যা হয়েছে, পরে চেষ্টা করুন।", event.threadID, event.messageID);
    }
  }
};
