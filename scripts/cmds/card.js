const config = require('../../config/config.json');
const logger = require('../../includes/logger');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createCanvas, loadImage } = require('canvas');

const ACCESS_TOKEN = '6628568379|c1e620fa708a1d5696fb991c1bde5662';

module.exports = {
  name: "card",
  version: "1.0.0",
  author: "Hridoy",
  description: "Generate a stylish profile card for a user with their profile picture and information ✨",
  adminOnly: false,
  commandCategory: "Fun",
  guide: "Use {pn}usercard to generate your own profile card or {pn}usercard @mention to generate for someone else.",
  cooldowns: 5,
  usePrefix: true,

  async onStart({ api, event, args }) {
    const threadID = event.threadID;
    const messageID = event.messageID;
    const senderID = event.senderID;

    let targetID = senderID;
    let filePath;

    try {
      if (args.length > 0) {
        const mentionedUsers = Object.keys(event.mentions || {});
        if (mentionedUsers.length > 0) targetID = mentionedUsers[0];
        else if (/^\d+$/.test(args[0])) targetID = args[0];
      }

      logger.info(`Generating usercard for user ${targetID} in thread ${threadID}`);

      const userInfo = await new Promise((resolve, reject) => {
        api.getUserInfo([targetID], (err, info) => {
          if (err) reject(err);
          else resolve(info);
        });
      });

      if (!userInfo || !userInfo[targetID]) throw new Error("Failed to fetch user information");

      const user = userInfo[targetID];
      const userName = user.name || "Unknown User";
      const userGender = user.gender || "Not specified";
      const userVanity = user.vanity || "No vanity URL";

      const profilePicUrl = `https://graph.facebook.com/${targetID}/picture?width=720&height=720&access_token=${ACCESS_TOKEN}`;
      const imageResponse = await axios.get(profilePicUrl, { responseType: 'arraybuffer' });
      const profilePic = await loadImage(Buffer.from(imageResponse.data));

      const canvasWidth = 1080;
      const canvasHeight = 1350;
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d');

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      gradient.addColorStop(0, '#1a237e');
      gradient.addColorStop(0.4, '#311b92');
      gradient.addColorStop(0.7, '#880e4f');
      gradient.addColorStop(1, '#c2185b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Sin wave lines
      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 200 + i * 200);
        for (let x = 0; x < canvasWidth; x += 20) {
          const y = 200 + i * 200 + Math.sin(x / 50) * 50;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      // Random white bubbles
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        const radius = Math.random() * 30 + 5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        ctx.fill();
      }
      ctx.restore();

      // Top black panel
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvasWidth, 150);

      // Title text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 15;
      ctx.fillText('USER PROFILE', canvasWidth / 2, 90);
      ctx.shadowBlur = 0;

      // Separator line
      ctx.beginPath();
      ctx.moveTo(canvasWidth * 0.2, 130);
      ctx.lineTo(canvasWidth * 0.8, 130);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Profile picture with radial glow
      const centerX = canvasWidth / 2;
      const centerY = 400;
      const radius = 250;

      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius - 30, centerX, centerY, radius + 30);
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 20, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Clip circle and draw profile picture
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(profilePic, centerX - radius, centerY - radius, radius * 2, radius * 2);
      ctx.restore();

      // Profile picture border
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Outer border
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();

      // Information panel
      const panelY = centerY + radius + 50;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(canvasWidth * 0.1, panelY, canvasWidth * 0.8, 400);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvasWidth * 0.1, panelY, canvasWidth * 0.8, 400);

      // Write user information
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.font = 'bold 50px Arial, sans-serif';
      ctx.fillText(`👤 Name: ${userName}`, canvasWidth * 0.15, panelY + 80);

      ctx.font = 'bold 40px Arial, sans-serif';
      ctx.fillText(`🆔 User ID: ${targetID}`, canvasWidth * 0.15, panelY + 160);

      const genderIcon = userGender === 'male' ? '♂️' : userGender === 'female' ? '♀️' : '⚧️';
      ctx.fillText(`${genderIcon} Gender: ${userGender}`, canvasWidth * 0.15, panelY + 240);

      ctx.fillText(`🔗 Vanity: ${userVanity}`, canvasWidth * 0.15, panelY + 320);

      // Footer panel with bot name and timestamp
      const footerY = canvasHeight - 100;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, footerY, canvasWidth, 100);

      const timestamp = new Date().toLocaleString();
      ctx.font = '30px Arial, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'right';
      ctx.fillText(`Generated: ${timestamp}`, canvasWidth - 40, footerY + 60);

      ctx.textAlign = 'left';
      ctx.fillText(`${config.bot.botName}`, 40, footerY + 60);

      // Prepare temp folder and file path
      const tempDir = path.join(__dirname, '..', '..', 'temp');
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

      const fileName = `usercard_${crypto.randomBytes(8).toString('hex')}.png`;
      filePath = path.join(tempDir, fileName);

      // Save and stream PNG to file
      const out = fs.createWriteStream(filePath);
      const stream = canvas.createPNGStream({ quality: 0.95 });
      stream.pipe(out);

      await new Promise((resolve, reject) => {
        out.on('finish', resolve);
        out.on('error', reject);
      });

      // Check file size
      const stats = fs.statSync(filePath);
      if (stats.size === 0) throw new Error("Generated image file is empty");

      const message = {
        body: `${config.bot.botName}: ✨ Here's the profile card for ${userName}! ✨`,
        attachment: fs.createReadStream(filePath)
      };

      logger.info(`Sending user card for: ${userName} (${targetID})`);
      await api.sendMessage(message, threadID, messageID);
      await api.setMessageReaction("✨", messageID);

      logger.info("User card sent successfully");

      // Clean up temporary file
      fs.unlinkSync(filePath);
      logger.info(`[Usercard Command] Generated and sent card for ${userName} (${targetID})`);

    } catch (error) {
      logger.error(`Error in usercard command: ${error.message}`, { stack: error.stack });

      await api.setMessageReaction("❌", messageID);
      await api.sendMessage(
        `${config.bot.botName}: ⚠️ Error occurred: ${error.message}`,
        threadID,
        messageID
      );

      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
};
