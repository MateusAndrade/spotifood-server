const validateAuth = (req, res, next) => {
  try {
    const { Authorization: authorization } = req.headers;

    if (!authorization) throw new Error("Invalid credentials"); 

    next();
  } catch (error) {
    console.log("Error =>", error.message);
    
    res.status(401).send(error.message);
  }
};

module.exports = validateAuth;