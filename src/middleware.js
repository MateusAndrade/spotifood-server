const { spotifyApi } = require("./provider");

const validateAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error("Invalid credentials"); 

    spotifyApi.setAccessToken(authorization);

    next();
  } catch (error) {
    console.log("Error =>", error.message);
    
    res.status(401).send(error.message);
  }
};

module.exports = validateAuth;