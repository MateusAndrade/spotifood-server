require('dotenv').config();

module.exports = {
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
  port: process.env.PORT || 3001,
}