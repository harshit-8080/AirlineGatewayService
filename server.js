const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
// const errorhandler = require("errorhandler");
const axios = require("axios");
const auth = require("./middlewares/auth");

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
});

app.get("/home", (req, res) => {
  return res.json({
    response: "success",
  });
});

const setAndStartServer = () => {
  app.use(morgan("combined"));
  app.use(limiter);
  // app.use(errorhandler());

  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/booking",
    auth,
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/flight",
    auth,
    createProxyMiddleware({
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );
  app.use(
    "/city",
    auth,
    createProxyMiddleware({
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );
  app.use(
    "/reminder",
    auth,
    createProxyMiddleware({
      target: "http://localhost:3004",
      changeOrigin: true,
    })
  );

  app.listen(9090, () => {
    console.clear();
    console.log("server started at 9090");
  });
};

setAndStartServer();
