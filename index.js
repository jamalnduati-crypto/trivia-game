
const readline = require("readline");

// Create the CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store the quiz questions in an array
const questions = [
  {
    question: "What is the capital of Kenya?",
    options: ["1. Mombasa", "2. Nairobi", "3. Kisumu", "4. Nakuru"],
    answer: "2"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["1. Python", "2. Java", "3. JavaScript", "4. C++"],
    answer: "3"
  },
  {
    question: "Which keyword declares a variable that can be reassigned?",
    options: ["1. const", "2. let", "3. fixed", "4. static"],
    answer: "2"
  }
];

let score = 0;
let currentQuestion = 0;
let timeLeft = 30;
let timer;

// Start the quiz
function startGame() {
  console.log("\n🎮 WELCOME TO THE TRIVIA GAME!");
  console.log("You have 30 seconds to answer all questions.");
  console.log("Type the number of your answer.\n");

  // Start the timer
  timer = setInterval(() => {
    timeLeft--;
    console.log(`⏱️ Time left: ${timeLeft} seconds`);

    if (timeLeft <= 0) {
      endGame("Time is up!");
    }
  }, 1000);

  askQuestion();
}

// Display questions one by one
function askQuestion() {
  if (currentQuestion >= questions.length) {
    endGame("You completed the quiz!");
    return;
  }

  const q = questions[currentQuestion];

  console.log(`\nQuestion ${currentQuestion + 1}: ${q.question}`);

  // Use an array iteration method
  q.options.map(option => console.log(option));

  rl.question("Your answer (1-4): ", (userAnswer) => {
    if (timeLeft <= 0) return;

    if (userAnswer.trim() === q.answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Incorrect! The correct answer was ${q.answer}.`);
    }

    currentQuestion++;
    askQuestion();
  });
}

// End the game and show the result
function endGame(message) {
  clearInterval(timer);

  console.log(`\n🏁 ${message}`);
  console.log(`Your score: ${score}/${questions.length}`);

  const percentage = Math.round((score / questions.length) * 100);
  console.log(`Your result: ${percentage}%`);

  rl.close();
}

startGame();
