const SpotifyWebApi = require("spotify-web-api-node");

const { clientId, clientSecret, redirectUri } = require("./config")

const scopesSpotifyWebApi =  ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private'];

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

module.exports = { spotifyApi, scopes: scopesSpotifyWebApi };
