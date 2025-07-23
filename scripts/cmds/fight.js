const TIMEOUT_SECONDS = 120; // timeout সময় (সেকেন্ডে)

const ongoingFights = new Map();
const gameInstances = new Map();

module.exports = {
  config: {
    name: "fight",
    version: "1.0",
    author: "Shikaki",
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Fight with your friends!",
    },
    longDescription: {
      vi: "",
      en: "Challenge your friends to a fight and see who wins!",
    },
    category: "🎮 Game",
    guide: "{prefix}fight @mention",
  },

  onStart: async function({ event, message, api, usersData, args }) {
    const threadID = event.threadID;

    if (ongoingFights.has(threadID)) {
      return message.reply("⚔️ A fight is already in progress in this group.");
    }

    const mentions = Object.keys(event.mentions);
    if (mentions.length !== 1)
      return message.reply("🤔 Please mention exactly one person to start a fight with.");

    const challengerID = event.senderID;
    const opponentID = mentions[0];

    if (challengerID === opponentID)
      return message.reply("❌ You cannot fight yourself!");

    const challengerName = await usersData.getName(challengerID);
    const opponentName = await usersData.getName(opponentID);

    // শুরু স্টেট
    const fight = {
      participants: [
        { id: challengerID, name: challengerName, hp: 100 },
        { id: opponentID, name: opponentName, hp: 100 },
      ],
      currentPlayer: Math.random() < 0.5 ? challengerID : opponentID,
      threadID,
      startTime: Date.now(),
    };

    const gameInstance = {
      fight,
      lastAttack: null,
      lastPlayer: null,
      timeoutID: null,
      turnMessageSent: false,
    };

    ongoingFights.set(threadID, fight);
    gameInstances.set(threadID, gameInstance);

    startFight(message, fight);
    startTimeout(threadID, message);
  },

  onChat: async function({ event, message }) {
    const threadID = event.threadID;
    const gameInstance = gameInstances.get(threadID);
    if (!gameInstance) return;

    const { fight } = gameInstance;
    const currentPlayerID = fight.currentPlayer;
    const senderID = event.senderID;

    const currentPlayer = fight.participants.find(p => p.id === currentPlayerID);
    if (!currentPlayer) return;

    const attack = event.body.trim().toLowerCase();

    // শুধুমাত্র কারো পালা হলে কমান্ড গ্রহণ করবে
    if (senderID !== currentPlayerID) {
      if (!gameInstance.turnMessageSent) {
        await message.reply(`🔄 It's ${currentPlayer.name}'s turn.`);
        gameInstance.turnMessageSent = true;
      }
      return;
    }

    // অনুমোদিত অ্যাটাকগুলো
    const validAttacks = ["kick", "punch", "slap", "forfeit"];

    if (!validAttacks.includes(attack)) {
      return message.reply("❌ Invalid attack! Use: kick, punch, slap, or forfeit.");
    }

    if (attack === "forfeit") {
      const opponent = fight.participants.find(p => p.id !== currentPlayerID);
      message.send(`🏃 ${currentPlayer.name} forfeits! ${opponent.name} wins!`);
      endFight(threadID);
      return;
    }

    // আঘাতের হিসাব (১০% মিসের সুযোগ)
    const damage = (Math.random() < 0.1) ? 0 : Math.floor(Math.random() * 20 + 10);
    const opponent = fight.participants.find(p => p.id !== currentPlayerID);
    opponent.hp -= damage;

    await message.send(
      `🥊 ${currentPlayer.name} uses ${attack} on ${opponent.name} and deals ${damage} damage.\n` +
      `${opponent.name} HP: ${opponent.hp < 0 ? 0 : opponent.hp}, ${currentPlayer.name} HP: ${currentPlayer.hp}`
    );

    if (opponent.hp <= 0) {
      await message.send(`🎉 ${currentPlayer.name} wins! ${opponent.name} is defeated.`);
      endFight(threadID);
      return;
    }

    // পালা পরিবর্তন
    fight.currentPlayer = opponent.id;
    gameInstance.lastAttack = attack;
    gameInstance.lastPlayer = currentPlayer;
    gameInstance.turnMessageSent = false;

    await message.send(`🔄 It's now ${opponent.name}'s turn.`);
  }
};

function startFight(message, fight) {
  const currentPlayer = fight.participants.find(p => p.id === fight.currentPlayer);
  const opponent = fight.participants.find(p => p.id !== fight.currentPlayer);

  message.send(
    `${currentPlayer.name} has challenged ${opponent.name} to a fight!\n` +
    `${currentPlayer.name} HP: ${currentPlayer.hp}, ${opponent.name} HP: ${opponent.hp}\n` +
    `It's ${currentPlayer.name}'s turn. Use 'kick', 'punch', 'slap' to attack or 'forfeit' to give up.`
  );
}

function startTimeout(threadID, message) {
  const timeoutID = setTimeout(() => {
    const gameInstance = gameInstances.get(threadID);
    if (!gameInstance) return;

    const fight = gameInstance.fight;
    const [p1, p2] = fight.participants;
    const winner = p1.hp > p2.hp ? p1 : p2;
    const loser = p1.hp > p2.hp ? p2 : p1;

    message.send(
      `⏰ Time's up! The game is over.\n` +
      `${winner.name} wins with ${winner.hp} HP! ${loser.name} is defeated.`
    );

    endFight(threadID);
  }, TIMEOUT_SECONDS * 1000);

  const gameInstance = gameInstances.get(threadID);
  if (gameInstance)
    gameInstance.timeoutID = timeoutID;
}

function endFight(threadID) {
  ongoingFights.delete(threadID);
  const gameInstance = gameInstances.get(threadID);
  if (gameInstance) {
    if (gameInstance.timeoutID) clearTimeout(gameInstance.timeoutID);
    gameInstances.delete(threadID);
  }
}
