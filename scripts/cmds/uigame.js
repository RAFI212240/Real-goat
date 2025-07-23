const fs = require('fs-extra');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const cacheDir = path.join(__dirname, 'cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

const chickenImageUrl = 'https://i.ibb.co/09zt9S1/0b0d0cfb69060b49b3f8328324cd72f5-removebg-preview.png';
const carImageUrl = 'https://i.ibb.co/1bBMKHF/Premium-Vector-Car-With-Fire-eps-removebg-preview.png';
const coinImageUrl = 'https://i.ibb.co/WnGs88y/Dollar-gold-coin-vector-illustration-removebg-preview.png';
const busImageUrl = 'https://i.ibb.co/FBm6p7p/Double-Decker-Bus-London-Icon-Hop-On-Hop-Off-British-Bus-Tourist-Bus-Party-Bus-Kiss-Cut-Stickers-rem.png';

module.exports = {
  config: {
    name: "uigame",
    version: "1.0",
    author: "Vex_Kshitiz",
    role: 0,
    shortDescription: "Game based on betting: help the chicken cross the road safely",
    longDescription: "A luck and betting based game where chicken tries to cross the road avoiding vehicles",
    category: "game",
    guide: {
      en: "{p}uncrossable <bet>"
    }
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    try {
      if (args.length !== 1 || isNaN(parseInt(args[0]))) {
        return message.reply("Please provide a valid bet amount.");
      }

      const betAmount = parseInt(args[0]);
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);

      if (betAmount > userData.money) {
        return message.reply("You don't have enough money to place this bet.");
      }

      const initialImageBuffer = await createInitialImage();
      const imagePath = await saveImageToCache(initialImageBuffer);
      
      const sentMessage = await message.reply({ attachment: fs.createReadStream(imagePath) });
      
      global.GoatBot.onReply.set(sentMessage.messageID, {
        commandName: "uncrossable",
        uid: senderID,
        lane: 0,
        bet: betAmount,
        withdrawn: false
      });

    } catch (error) {
      console.error("Error in command:", error);
      message.reply("An error occurred. Please try again.");
    }
  },

  onReply: async function ({ api, message, event, args, usersData }) {
    const replyData = global.GoatBot.onReply.get(event.messageReply.messageID);

    if (!replyData || replyData.uid !== event.senderID) return;
    const { commandName, uid, lane, bet, withdrawn } = replyData;
    if (commandName !== "uncrossable") return;

    const userData = await usersData.get(uid);

    if (args[0] === "withdraw") {
      if (withdrawn) {
        return message.reply("You've already withdrawn your winnings.");
      }
      await usersData.set(uid, { money: userData.money + bet });
      global.GoatBot.onReply.delete(event.messageReply.messageID);
      return message.reply(`You have successfully withdrawn ${bet} coins.`);
    } else if (args[0] === "cross") {
      const newLane = lane + 1;
      const newBetAmount = bet * 2;

      if (newLane >= 5) {
        await usersData.set(uid, { money: userData.money + newBetAmount });
        global.GoatBot.onReply.delete(event.messageReply.messageID);
        return message.reply(`Congratulations! You successfully crossed the road and won ${newBetAmount} coins.`);
      }

      const isHit = Math.random() < 0.3;

      if (isHit) {
        const hitImageBuffer = await createHitImage(newLane);
        const imagePath = await saveImageToCache(hitImageBuffer);
        await message.reply({ attachment: fs.createReadStream(imagePath) });
        await usersData.set(uid, { money: userData.money - bet });
        global.GoatBot.onReply.delete(event.messageReply.messageID);
        return message.reply(`Oh no! The chicken got hit by a vehicle. You lost ${bet} coins.`);
      } else {
        const crossingImageBuffer = await createCrossingImage(newLane);
        const imagePath = await saveImageToCache(crossingImageBuffer);
        const sentMessage = await message.reply({ attachment: fs.createReadStream(imagePath) });

        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: "uncrossable",
          uid: uid,
          lane: newLane,
          bet: newBetAmount,
          withdrawn: false
        });
      }
    } else {
      message.reply("Invalid command. Use 'cross' to move the chicken or 'withdraw' to withdraw your bet.");
    }
  }
};

async function createInitialImage() {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  // Background and lanes
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let i = 1; i <= 4; i++) {
    ctx.fillRect(i * 100, 0, 5, canvas.height);
  }

  const chickenImage = await loadImage(chickenImageUrl);
  ctx.drawImage(chickenImage, 0, 200, 100, 100);

  const coinImage = await loadImage(coinImageUrl);
  const vehicleImages = await Promise.all([loadImage(carImageUrl), loadImage(busImageUrl)]);
  const positions = [50, 150, 250, 350];

  for (let i = 1; i <= 4; i++) {
    const coinY = positions[Math.floor(Math.random() * positions.length)];
    ctx.drawImage(coinImage, i * 100 + 25, coinY, 50, 50);

    if (Math.random() < 0.5) {
      let vehicleY;
      do {
        vehicleY = positions[Math.floor(Math.random() * positions.length)];
      } while (vehicleY === coinY);
      const vehicleImage = vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
      ctx.drawImage(vehicleImage, i * 100 + 25, vehicleY, 50, 50);
    }
  }

  return canvas.toBuffer();
}

async function createCrossingImage(lane) {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let i = 1; i <= 4; i++) {
    ctx.fillRect(i * 100, 0, 5, canvas.height);
  }

  const chickenImage = await loadImage(chickenImageUrl);
  ctx.drawImage(chickenImage, lane * 100, 200, 100, 100);

  const coinImage = await loadImage(coinImageUrl);
  const vehicleImages = await Promise.all([loadImage(carImageUrl), loadImage(busImageUrl)]);
  const positions = [50, 150, 250, 350];

  for (let i = 1; i <= 4; i++) {
    if (i !== lane) {
      const coinY = positions[Math.floor(Math.random() * positions.length)];
      ctx.drawImage(coinImage, i * 100 + 25, coinY, 50, 50);

      if (Math.random() < 0.5) {
        let vehicleY;
        do {
          vehicleY = positions[Math.floor(Math.random() * positions.length)];
        } while (vehicleY === coinY);
        const vehicleImage = vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
        ctx.drawImage(vehicleImage, i * 100 + 25, vehicleY, 50, 50);
      }
    }
  }

  return canvas.toBuffer();
}

async function createHitImage(lane) {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let i = 1; i <= 4; i++) {
    ctx.fillRect(i * 100, 0, 5, canvas.height);
  }

  const carImage = await loadImage(carImageUrl);
  ctx.drawImage(carImage, lane * 100, 200, 100, 100);

  const coinImage = await loadImage(coinImageUrl);
  const vehicleImages = await Promise.all([loadImage(carImageUrl), loadImage(busImageUrl)]);
  const positions = [50, 150, 250, 350];

  for (let i = 1; i <= 4; i++) {
    if (i !== lane) {
      const coinY = positions[Math.floor(Math.random() * positions.length)];
      ctx.drawImage(coinImage, i * 100 + 25, coinY, 50, 50);

      if (Math.random() < 0.5) {
        let vehicleY;
        do {
          vehicleY = positions[Math.floor(Math.random() * positions.length)];
        } while (vehicleY === coinY);
        const vehicleImage = vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
        ctx.drawImage(vehicleImage, i * 100 + 25, vehicleY, 50, 50);
      }
    }
  }

  return canvas.toBuffer();
}

async function saveImageToCache(imageBuffer) {
  const filename = `chicken_${Date.now()}.png`;
  const imagePath = path.join(cacheDir, filename);
  await fs.promises.writeFile(imagePath, imageBuffer);
  return imagePath;
}
