const express = require("express");
const session = require('express-session');
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
/**
 * Middlewares
 */
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname,"/public/")));
app.use(session({secret: 'INFO620HieuSessionKey', resave: true, saveUninitialized: true}));
/**
 * Set up variables
 */
/**
 * End
 */

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(PORT,()=>{
    debug(`listening on port ${chalk.green(PORT)}`);
});
