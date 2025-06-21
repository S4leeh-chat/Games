const wordList = ['تفاح', 'سحاب', 'نجاح', 'كتاب', 'سلام'];
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let timer = 300;
let timerDisplay = document.getElementById("timer");
let messageBox = document.getElementById("message");
let guesses = []; // تخزين الكلمات التي تم تخمينها

function checkGuess() {
    const input = document.getElementById("guessInput");
    const guess = input.value.trim();
    if (guess === targetWord) {
        messageBox.textContent = "🎉 إجابة صحيحة!";
        clearInterval(countdown);
    } else {
        messageBox.textContent = "❌ حاول مرة أخرى!";
    }

    // إضافة الكلمة إلى قائمة التخمينات مع تحليل الحروف
    guesses.push(guess);
    updateGuessList(guess);

    input.value = "";
}

function updateGuessList(guess) {
    const guessList = document.getElementById("guessList");
    const li = document.createElement("li");

    let result = "";
    for (let i = 0; i < targetWord.length; i++) {
        const currentLetter = guess[i];
        if (currentLetter === targetWord[i]) {
            result += `<span style="color: green">${currentLetter}</span>`; // حرف صحيح
        } else if (targetWord.includes(currentLetter)) {
            result += `<span style="color: yellow">${currentLetter}</span>`; // حرف موجود ولكن في مكان خاطئ
        } else {
            result += `<span style="color: gray">${currentLetter}</span>`; // حرف غير صحيح
        }
    }

    li.innerHTML = result;
    guessList.appendChild(li);
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