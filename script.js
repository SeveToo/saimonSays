const panel = document.querySelectorAll('.panel')
const h3 = document.querySelector('h3')
const h4 = document.querySelector('h4')
const gameBoard = document.querySelector('.gameBoard')
const startBtn = document.querySelector('.startBtn')
let numbers = []
let currentLevel = 1

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function start() {
  gameBoard.classList.remove('youLost')
  h4.innerHTML = ''
  currentLevel = 1
  for (let i = 0; i < 10000; i++) {
    numbers[i] = rand(0, 8)
  }
  console.log(numbers.map(el => el + 1))
  output()
}
startBtn.onclick = () => {
  start()
}

function showPanel(nr) {
  panel[nr].classList.add('active')
  setTimeout(() => {
    panel[nr].classList.remove('active')
  }, 500)
}

function output() {
  showLevel()
  let i = 0
  const interval = setInterval(() => {
    if (i < currentLevel) {
      showPanel(numbers[i])
      i++
    } else {
      clearInterval(interval)
      waitToInput()
    }
  }, 1000)
  setTimeout(() => {
    unLockKeyboard()
  }, (currentLevel + 1) * 1000)
}

function waitToInput() {
  let inputNumbers = ''
  panel.forEach(el => {
    el.onclick = () => {
      showPanel(el.getAttribute('date-nr'))
      inputNumbers += el.getAttribute('date-nr')
      if (inputNumbers.length == currentLevel) {
        checkAnswer(inputNumbers)
        lockKeyboard()
      }
    }
  })
}

function showLevel() {
  h3.innerHTML = `Level: ${currentLevel}`
}

function lockKeyboard() {
  gameBoard.classList.add('block')
}

function unLockKeyboard() {
  gameBoard.classList.remove('block')
}

function showOK() {
  gameBoard.classList.add('next')
  setTimeout(() => {
    gameBoard.classList.remove('next')
  }, 500)
}

function showLost() {
  gameBoard.classList.add('youLost')
}

function nextLevel() {
  setTimeout(() => {
    showOK()
    setTimeout(() => {
      currentLevel++
      output()
    }, 500)
  }, 500)
}

function youLost() {
  showLost()
  h3.innerHTML = 'You Lost'
  h4.innerHTML = 'Click RESTART to try again'
  startBtn.innerHTML = 'RESTART'
}

function checkAnswer(answer) {
  answer = answer.split('')
  foo = true
  for (let i = 0; i < currentLevel; i++) {
    // h3.innerHTML = answer[i] + " " + numbers[i];
    if (answer[i] != numbers[i]) foo = false
  }
  if (foo) nextLevel()
  else youLost()
  // h4.innerHTML = foo;
}

// showPanel(1);
