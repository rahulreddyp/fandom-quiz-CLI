const readlineSync = require('readline-sync');
const chalk = require("chalk");

const error = chalk.bold.redBright;
const success = chalk.bold.underline.green;
const orange = chalk.keyword('orange');

const log = console.log;

log(chalk.blueBright.bold("Hello, Welcome to the fun Bollywood Quiz!"));
const playerName = readlineSync.question(chalk.yellow.bold('First things first, tell me your name? '));
log(chalk.bold.blue("----------------\n" + "Hey there ", chalk.italic(`${playerName}!`)), chalk.cyan.italic("\nLet's Begin the quiz\n"));

log(error("RULES:\n") + orange("\nYou need to guess the right answers to these bollywood questions\n 1. Each Correct answer gives you 1 mark and negative 1 for each wrong answer.\n 2. You'll be notified on crossing a new level."));

const quizData = [{
  question: " In the movie “Lage Raho Munna Bhai”, which profession does Sanjay Dutt pretend to do",
  options: ["Criminal lawyer", "Doctor", "Construction worker", "History professor"],
  answer: "4"
}, {
  question: "The movie “Saathiya” included which of the following songs?",
  options: ["Aao Na", "Tere Liye", "Dola Re Dola", "Chhalka Re"],
  answer: "4"
}, {
  question: "Name Aamir Khan’s character in the Oscar-nominated film 'Lagaan'",
  options: ["Sajjan", "Arjan", "Bhuvan", "Lallan"],
  answer: "3"
},
{
  question: "Which of these films featured a song sung by Amitabh Bachchan?",
  options: ["Don", "Silsila", "Sholay", "Hum"],
  answer: "2"
}, {
  question: "The song ‘Tumhe Jo Maine Dekha’ starred which of these people? ",
  options: ["Shahrukh & Rani", "Shahrukh & Preity", "Shahrukh and Sushmita", "Shahrukh & Aishwarya"],
  answer: "3"
}, {
  question: "Before Akshay Kumar became an actor, he worked as a",
  options: ["Clerk", "Waiter",  "Reporter", "Model"],
  answer: "2"
}]


 var highScore = [
  {
    name: "vishal",
    score: 10
}]

var currScore = 0, level = 0;

function playQuiz({question, options, answer}) {
  // check quiz level 
   checkLevel(currScore);
  // Display question to user
  log(chalk.yellowBright.bold(question));
  //show the options
  var userAnswer = readlineSync.keyInSelect(options, null, {cancel: false});
 
  if((userAnswer+1).toString() === answer) {
    log(success("Yay! You answered it right"));
    currScore += 1;
    
  }else {
    log(error("Sorry, it's a wrong answer ") + (":(") +
    chalk.cyanBright("\n CORRECT ANSWER: ") + chalk.green.italic(options[answer-1]));
    currScore = currScore - 1;
    if(currScore<0) currScore = 0;
  }
  log(chalk.keyword("orange").bgBlue("\nYour Current Score is:"), currScore);
  log(chalk.magentaBright("------------"));
}

function checkLevel(score) {
  switch(score) {
    case 2:
          level++;
          log(chalk.bgRed.italic("\nYou've just reached a new level:\t")+chalk.bold.red(level));
          break;
    case 5:
          level++;
         log(chalk.bgRed.italic("\nYou've just reached a new level:\t")+chalk.bold.red(level));
          break;
    case 10:
          level++;
          log(chalk.bgRed.italic("\nYou've just reached a new level:\t")+chalk.bold.red(level));
          break;
  }
}

for(var i=0;i<quizData.length;i++) {
  log(chalk.bgMagenta.underline("Question No:",i+1));
  playQuiz(quizData[i]);
  if(i == quizData.length -1){
    checkHighScore();
    log(success("Thanks for playing...."));
  }
}

function checkHighScore() {
  var highestScore = highScore.reduce((highest, topPlayer) => highest.score > topPlayer.score ? highest.score : topPlayer.score, currScore);

  if(highestScore < currScore ) {
    log(chalk.bold.bgCyan.red("Congrats! You've broken the record and created a  new high score:"), currScore);

    highScore.push({name: playerName, score: currScore})
  }
}
