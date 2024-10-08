// Инициализация Telegram Web App
window.Telegram.WebApp.ready();

// Функция для генерации случайного слова
function generateRandomWord() {
    const length = 8;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < length; i++) {
        word += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    const position = Math.floor(Math.random() * length);
    word = word.substring(0, position) + word.charAt(position).toUpperCase() + word.substring(position + 1);
    return word;
}

let words = [];
let uppercaseLetters = '';

// Генерация 8 слов
function generateWords() {
    words = [];
    uppercaseLetters = '';
    for (let i = 0; i < 8; i++) {
        const word = generateRandomWord();
        words.push(word);
        const uppercaseChar = word.match(/[A-Z]/)[0];
        uppercaseLetters += uppercaseChar;
    }
    displayWords();
}

function displayWords() {
    const wordsContainer = document.getElementById('words-container');
    wordsContainer.innerHTML = '';
    words.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word';
        wordElement.textContent = word;
        wordsContainer.appendChild(wordElement);
    });
}

function checkAnswer() {
    const userInput = document.getElementById('user-input').value;
    const resultContainer = document.getElementById('result');
    if (userInput === uppercaseLetters) {
        resultContainer.textContent = 'Правильно! Вы собрали все заглавные буквы.';
        resultContainer.style.color = 'green';

        // Отправка данных боту
        Telegram.WebApp.sendData(JSON.stringify({ score: 1 }));
    } else {
        resultContainer.textContent = 'Неправильно. Попробуйте снова.';
        resultContainer.style.color = 'red';
    }
}

document.getElementById('submit-button').addEventListener('click', checkAnswer);

// Инициализация игры
generateWords();
