const express = require("express");

const axios = require("axios");

const router = express.Router();

const authMiddleware = require("./middleware");

const { spotifyApi, scopes } = require("./provider");

const { redirectUri } = require("./config");

router.get("/", (req, res) => {
  res.status(200).send(`Server Up 🚀`);
});

router.get("/error", (req, res) => {
  res.status(500);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);

    if (data) {
      res.redirect(redirectUri);
    }
  } catch (err) {
    res.redirect(`/error?message=${error.message}`);
  }
});

router.get("/oauth2-url", (req, res) => {
  const url = spotifyApi.createAuthorizeURL(scopes);

  res.status(200).send({ url: `${url}&show_dialog=true` });
});

router.get("/oauth2", async (req, res) => {
  const { code } = req.query;

  const data = await spotifyApi.authorizationCodeGrant(code);

  const { access_token, refresh_token } = data.body;

  res.send({ access_token, refresh_token });
});

router.get("/oauth2/refresh", authMiddleware, async (req, res) => {
  try {
    const data = await spotifyApi.refreshAccessToken();

    const { access_token, refresh_token } = data.body;

    res.send({ access_token, refresh_token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/filters", async (req, res) => {
  try {
    const data = await axios.get(
      "http://www.mocky.io/v2/5a25fade2e0000213aa90776"
    );
    res.status(200).send(data.data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/playlists", authMiddleware, async (req, res) => {
  try {
    const { body } = await spotifyApi.getUserPlaylists();
    res.status(200).send(body);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
