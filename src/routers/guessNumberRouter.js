const express = require("express");
const debug = require("debug")("app:guessNumberRouter");

const guessNumberRouter = express.Router();

guessNumberRouter
  .route("/")
  .get((req, res) => {
    res.render("index");
  })
  .post((req, res) => {
    const { guessedNumber } = req.body;
    const result = guessNumber(guessedNumber, req);
    res.json({ 
      Message: result[0], 
      Status: result[1], 
    });
  });
guessNumberRouter
  .route("/loaddata")
  .post((req, res) => {
    const RDPSessionNumber = getGameID(req);
    const message = `Game number ${RDPSessionNumber} started`;
    res.json({
      Message: message
    });
  });

function getGameID(req) {
  //assign values to session counter
  initializeSessions(req);
  return generateRandomNumber(1, 1000000); 
}

function initializeSessions(req) {
  req.session.guessCounter = 1;
  req.session.randomNumber = generateRandomNumber(1, 100);
}

function guessNumber(guessedNumber, req) {
  try {
    //if sessions are null, assign values again.
    if (req.session.randomNumber == null || req.session.guessCounter == null)
      initializeSessions(req);
    
    const maxGuess = 5;
    const minNumber = 1;
    const maxNumber = 100;
    const randomNumber = req.session.randomNumber;
    let guessCounter = req.session.guessCounter;
    //reassign the guessCounter session when we increase the counter by 1.
    req.session.guessCounter = guessCounter + 1;

    //set the list of notification
    const notification = {
      Success: "Congratulations!!!! You won!!!!",
      Reset: "",
      Correct: "The guess of [GuessedNumber] is correct.",
      DisplayCorrectNumber: "The number to guess was [RandomNumber]",
      CountDown:
        "This is guess number [GuessCounter]. You have [GuessRemain] guesses remaining.",
      High: "The guess of [GuessedNumber] is too high!",
      OutOfRange: "Please enter a number between 1 and 100"
    };

    if (guessCounter >= maxGuess) {
      //user has 5 times to guess, next wrong guess, the game end
      return [notification.DisplayCorrectNumber.replace("[RandomNumber]",randomNumber),"max"];
    } else {
      if (guessedNumber == randomNumber)
        return [notification.Success, "succeeded"];
      if (guessedNumber < minNumber || guessedNumber > maxNumber)
        return [notification.OutOfRange, "failed"];
      if (guessedNumber > randomNumber + 5)
        return [notification.High.replace("[GuessedNumber]", guessedNumber), "failed"];
      if (guessedNumber < randomNumber)
        return [notification.CountDown.replace("[GuessCounter]", guessCounter).replace("[GuessRemain]", (maxGuess - guessCounter)), "failed"];
    }
  }
  catch (ex) {
    debug(ex);
  }
  return "Something went wrong";
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

//export the function, so we can call it in app.js
module.exports = guessNumberRouter;
