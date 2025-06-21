const wordList = ['تفاح', 'سحاب', 'نجاح', 'كتاب', 'سلام'];
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let timer = 300;
let timerDisplay = document.getElementById("timer");
let messageBox = document.getElementById("message");

function checkGuess() {
    const input = document.getElementById("guessInput");
    const guess = input.value.trim();
    if (guess === targetWord) {
        messageBox.textContent = "🎉 إجابة صحيحة!";
        clearInterval(countdown);
    } else {
        messageBox.textContent = "❌ حاول مرة أخرى!";
    }
    input.value = "";
}

const countdown = setInterval(() => {
    if (timer <= 0) {
        clearInterval(countdown);
        messageBox.textContent = `انتهى الوقت! الكلمة كانت: ${targetWord}`;
    } else {
        timer--;
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        timerDisplay.textContent =
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds;
    }
}, 1000);