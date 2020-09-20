/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/server/app.js

const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");
// const cors = require("cors");
const app = express();
const helmet = require("helmet");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const passportSocketIo = require("passport.socketio");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const compression = require("compression");
const path = require("path");
// const mockgoose = require("mockgoose");
const debug = require("debug")("server");

const config = require("./config/");
const passportConfig = require("./config/passport")(config, passport);
const routes = require("./routes");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chat_dev";

mongoose.connect(MONGODB_URI);

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
});

const secret = process.env.SESSION_SECRET || config.session.secret;

const sessionSettings = {
  key: "express.sid",
  store: sessionStore,
  secret,
  cookie: { httpOnly: false },
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use(helmet());
app.use(logger("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);
if (process.env.NODE_ENV == "development") {
  debug("Webpack dev middleware enabled");

  const webpack = require("webpack");
  const webpackConfig = require("../../webpack/webpack.config.dev.js");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
} else {
  debug("Serving production bundle");

  app.get("/bundle.js", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "..", "dist", "bundle.js"))
  );
  app.get("/bundle.js.map", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "..", "dist", "bundle.js.map"))
  );
}

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);
io.use(
  passportSocketIo.authorize({
    key: "express.sid",
    secret,
    store: sessionStore,
    success: (data, accept) => accept(),
    fail: (data, message, error, accept) => {
      if (error) {
        debug(`error: ${message}`);

        accept(new Error("Unauthorized"));
      } else {
        debug(`ok: ${message}`);
        accept(new Error("Unauthorized"));
      }
    },
  })
);

const socketHandler = require("./socket.js")(config, io);

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`listening on *:${port}`));

module.exports = {
  server,
  app,
};
