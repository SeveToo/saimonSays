const panel = document.querySelectorAll('.panel')
const h3 = document.querySelector('h3')
const h4 = document.querySelector('h4')
const gameBoard = document.querySelector('.gameBoard')
const startBtn = document.querySelector('.startBtn')

let numbers = []
let currentLevel = 1

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const showLevel = () => {
  h3.innerHTML = `Level: ${currentLevel}`
}

const showPanel = nr => {
  panel[nr].classList.add('active')
  setTimeout(() => {
    panel[nr].classList.remove('active')
  }, 500)
}

const checkAnswer = answer => {
  answer = answer.split('')
  foo = true
  if (answer.length < currentLevel) {
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] != numbers[i]) foo = false
    }
    if (!foo) youLost()
  }

  if (answer.length == currentLevel) {
    for (let i = 0; i < currentLevel; i++) {
      if (answer[i] != numbers[i]) foo = false
    }
    if (foo) nextLevel()
    else youLost()
  }
}

const waitToInput = () => {
  let inputNumbers = ''
  panel.forEach(el => {
    el.onclick = () => {
      showPanel(el.getAttribute('date-nr'))
      inputNumbers += el.getAttribute('date-nr')
      checkAnswer(inputNumbers)
      if (inputNumbers.length == currentLevel) {
        //   checkAnswer(inputNumbers)
        lockKeyboard()
      }
    }
  })
}

const clearMonits = () => {
  gameBoard.classList.remove('youLost')
  h4.innerHTML = ''
}

const setMonits = () => {
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

const randomizeLevelSequence = () => {
  for (let i = 0; i < 10000; i++) {
    numbers[i] = rand(0, 8)
  }
}

const start = () => {
  currentLevel = 1
  clearMonits()
  randomizeLevelSequence()
  //   console.log(numbers.map(el => el + 1))
  setMonits()
}
startBtn.onclick = () => {
  start()
}

const lockKeyboard = () => {
  gameBoard.classList.add('block')
}

const unLockKeyboard = () => {
  gameBoard.classList.remove('block')
}

const animationCorrectAnswer = () => {
  gameBoard.classList.add('next')
  setTimeout(() => {
    gameBoard.classList.remove('next')
  }, 500)
}

const nextLevel = () => {
  setTimeout(() => {
    animationCorrectAnswer()
    setTimeout(() => {
      currentLevel++
      setMonits()
    }, 500)
  }, 500)
}

const showLost = () => {
  gameBoard.classList.add('youLost')
  h3.innerHTML = 'You Lost'
  h4.innerHTML = 'Click RESTART to try again'
  startBtn.innerHTML = 'RESTART'
}

const youLost = () => {
  showLost()
  lockKeyboard()
}
