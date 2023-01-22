const axios = require("axios");

const auth = async (req, res, next) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/auth/authenticate",
      {
        headers: {
          "x-access-token": req.headers["x-access-token"],
        },
      }
    );
    if (response) {
      next();
    } else {
      return res.status(401).json({
        error: "falied to authenticate",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: "falied to authenticate",
    });
  }
};

module.exports = auth;
