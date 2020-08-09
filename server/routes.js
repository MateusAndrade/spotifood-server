const express = require("express");

const router = express.Router();

const authMiddleware = require("./middleware");

const { spotifyApi , scopes } = require("./provider");

router.get("/", (req, res) => {
  res.render("index.html", { title: "Spotify API" });
});

router.get("/home", (req, res) => {
  const { code } = req.query;
  res.send({ code });
}); 

router.get("/login", (req, res) => {
  const htmlLogin = spotifyApi.createAuthorizeURL(scopes);

  res.send(`${htmlLogin}&show_dialog=true`);
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code)

    const { access_token, refresh_token } = data.body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:3001/playlists');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

router.get('/playlists', authMiddleware, async (req, res) => {
  try {
    const { body } = await spotifyApi.getUserPlaylists();
    res.status(200).send(body);
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;