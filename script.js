
const secretWord = "تفاح";
const maxAttempts = 6;
let attempts = 0;
const previousGuessesDiv = document.getElementById("previousGuesses");

function analyzeGuess(guess) {
  if (guess.length !== secretWord.length) return "❌ الكلمة لازم تكون 4 حروف";
  let result = "";
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secretWord[i]) {
      result += "<span class='correct'>" + guess[i] + "</span>";
    } else if (secretWord.includes(guess[i])) {
      result += "<span class='misplaced'>" + guess[i] + "</span>";
    } else {
      result += "<span class='wrong'>" + guess[i] + "</span>";
    }
  }
  return result;
}

function submitGuess(fromChat = false, guessText = "") {
  const input = document.getElementById("guessInput");
  const guess = fromChat ? guessText.trim() : input.value.trim();
  if (!guess) return;
  const feedback = analyzeGuess(guess);
  const div = document.createElement("div");
  div.innerHTML = "🔹 " + guess + " ➜ " + feedback;
  previousGuessesDiv.prepend(div);
  if (!fromChat) input.value = "";
}

// إعداد بوت الشات
const client = new tmi.Client({
  channels: ['s4leeh']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  if (message.startsWith("!خمن ")) {
    const guess = message.replace("!خمن ", "").trim();
    submitGuess(true, guess);
  }
});
