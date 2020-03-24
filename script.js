const world = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

const words = [
"apple",
"home",
"earth",
"element",
"transparent",
"cat",
"parrot",
"coding",
"robot",
"programm"
];

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
text.focus();

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

const timeInterval = setInterval(updateTime, 1000)

function updateTime () {
    time --
    timeEl.innerHTML = time + "s"
    if (time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}

function gameOver() {
    endgameEl.innerHTML = `<h1>Время закончилось</h1>
<p>Ваш счёт ${score}</p>
<button onclick="location.reload()">Обновить</button>
`
}

function getRandomWord() {
return words [Math.floor(Math.random() * words.length)]
}
function addWordToDOM() {
randomWord = getRandomWord()
word.innerHTML = randomWord
}
function updateScore() {
    score++
    scoreEl.innerHTML = score;
}

addWordToDOM()

text.addEventListener("input", e => {
const insertedText = e.target.value;
if(insertedText === randomWord) {
    addWordToDOM()
    updateScore()
    e.target.value = "";
    console.log('difficulty', difficulty)
    console.log('time', time)
   if (difficulty === 'hard') {
       time += 2;
    } else if (difficulty === 'middle') {
       time += 4;
    }
   else{
       time += 6
   }
    updateTime()
}
})

settingsForm.addEventListener('change', e => {
difficulty = e.target.value
console.log(difficulty)
localStorage.setItem('difficulty', difficulty)
})