const express = require("express");

const router = express.Router();

const authMiddleware = require("./middleware");

const { spotifyApi , scopes } = require("./provider");

const { redirectUri } = require("./config");

router.get("/", (req, res) => {
  res.status(200).send(`Server Up 🚀`);
});

router.get("/oauth2", (req, res) => {
  const { code } = req.query;
  res.send({ code });
}); 

router.get("/login", (req, res) => {
  const htmlLogin = spotifyApi.createAuthorizeURL(scopes);

  res.send(`${htmlLogin}&show_dialog=true`);
});

router.get("/error", (req, res) => {
  res.status(500);
});


router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code)

    const { access_token, refresh_token } = data.body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect(redirectUri);
  } catch(err) {
    res.redirect(`/error?message=${error.message}`);
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