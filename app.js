const express = require("express");
const session = require('express-session');
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const guessNumberRouter = require('./src/routers/guessNumberRouter');
/**
 * Middlewares
 */
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname,"/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'INFO620HieuSessionKey', resave: true, saveUninitialized: true}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use("/", guessNumberRouter);

app.listen(PORT,()=>{
    debug(`listening on port ${chalk.green(PORT)}`);
});
