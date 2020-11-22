const api_url = "https://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('displayText');
const quoteInputElement = document.getElementById('inputText');
const timerElement = document.getElementById('timer');

quoteInputElement.addEventListener('input', () => {
    const charsArray = quoteDisplayElement.querySelectorAll('span');
    const inputArray = quoteInputElement.value.split('');
    let correct = true;
    charsArray.forEach((characterSpan, index) => {
        const character = inputArray[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });
    if (correct) renderNextQuote();
});

function getQuote() {
    return fetch(api_url)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNextQuote() {
    const quote = await getQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplayElement.appendChild(charSpan);
    });
    quoteInputElement.value = null;
    setTimer()
}

let startTime;

function setTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = startTimer();
    }, 1000);
}

function startTimer() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNextQuote();