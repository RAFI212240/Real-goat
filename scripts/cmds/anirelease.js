const axios = require('axios');
const moment = require('moment-timezone');

const Timezone = 'Asia/Dhaka'; // change here
const API_URL = `https://anisched--marok85067.repl.co/?timezone=${Timezone}`;

module.exports = {
  config: {
    name: 'anirelease',
    aliases: ['anirelease', 'newepisode'],
    version: '7.1', // Version updated for minor improvements
    author: 'KSHITIZ',
    role: 0,
    category: 'anime',
    shortDescription: {
      en: 'Shares the latest anime releases.'
    },
    longDescription: {
      en: 'Shares the latest anime releases fetched from an API, categorized by upcoming and already updated episodes.'
    },
    guide: {
      en: '{pn}'
    }
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get(API_URL);

      if (response.status !== 200 || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid or missing response from the API.');
      }

      const releases = response.data;
      const currentTime = moment().tz(Timezone);

      let upcomingAnime = [];
      let updatedAnime = [];

      for (const release of releases) {
        // Basic validation for release data
        if (!release.animeTitle || !release.episode || !release.time || !release.status) {
          console.warn('Skipping malformed release data:', release);
          continue; // Skip to the next release if data is incomplete
        }

        // Parse time with timezone awareness
        const releaseDateTime = moment(release.time, 'h:mma', Timezone);
        
        if (release.status === 'upcoming') {
          upcomingAnime.push(release);
        } else if (release.status === 'already updated') {
          updatedAnime.push(release);
        }
      }

      let message = `Current Time in ${Timezone}: ${currentTime.format('h:mm A, dddd, MMMM D, YYYY')}\n\n`;
      let hasContent = false;

      // Upcoming Anime Section
      if (upcomingAnime.length > 0) {
        hasContent = true;
        message += '╔═════•.:. 𝐀𝐍𝐈𝐌𝐄 𝐔𝐏𝐂𝐎𝐌𝐈𝐍𝐆 𝐇𝐎𝐔𝐑𝐒 .:.•═════╗\n\n';
        // Sort by time
        upcomingAnime.sort((a, b) => moment(a.time, 'h:mma').diff(moment(b.time, 'h:mma')));
        for (const anime of upcomingAnime) {
          message += `• ${anime.animeTitle} - Episode ${anime.episode}\n  Release Time: ${anime.time}\n\n`;
        }
        message += '╚═════════════════════════════════════╝\n\n';
      }

      // Already Updated Anime Section
      if (updatedAnime.length > 0) {
        hasContent = true;
        message += '╔═════•.:. 𝐀𝐍𝐈𝐌𝐄 𝐀𝐋𝐑𝐄𝐀𝐃𝐘 𝐔𝐏𝐃𝐀𝐓𝐄𝐃 .:.•═════╗\n\n';
        // Sort by time
        updatedAnime.sort((a, b) => moment(a.time, 'h:mma').diff(moment(b.time, 'h:mma')));
        for (const anime of updatedAnime) {
          message += `• ${anime.animeTitle} - Episode ${anime.episode}\n  Updated At: ${anime.time}\n\n`;
        }
        message += '╚═════════════════════════════════════╝\n\n';
      }

      if (!hasContent) {
        message += 'No anime releases found for today.';
      }

      await api.sendMessage(message.trim(), event.threadID);

    } catch (error) {
      console.error(`Failed to send anime releases: ${error.message}`);
      api.sendMessage(
        'Sorry, something went wrong while trying to share the latest anime releases. Please try again later.',
        event.threadID
      );
    }
  }
};
