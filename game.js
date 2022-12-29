const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Một bài hát _ lên",
        choice1: 'Vang',
        choice2: 'Mở',
        choice3: 'Đang',
        choice4: 'Chơi',
        answer: 1,
    },
    {
        question:
            "Cô ấy __ (taps) chân",
        choice1: "Đạp",
        choice2: "Mở",
        choice3: "Nhịp",
        choice4: "Đá",
        answer: 3,
    },
    {
        question: "Đầu cô ấy ______(sways)",
        choice1: "Nhộn nhịp",
        choice2: "Lắc lư",
        choice3: "Nhúc nhích",
        choice4: "Lủng lẳng",
        answer: 2,
    },
    {
        question: "Bài hát đã ____(ended)",
        choice1: "hết",
        choice2: "Cuối",
        choice3: "Bật",
        choice4: "Chết",
        answer: 1,
    },
    {
        question: "Radio __ (plays) một bài hát khác",
        choice1: "Hát",
        choice2: "In",
        choice3: "Được",
        choice4: "Phát",
        answer: 4,
    },
    {
        question: "Cô ấy ngồi ____(silently)",
        choice1: "Ồn ào",
        choice2: "Xô bồ",
        choice3: "Yên lặng",
        choice4: "Nhanh nhẹn",
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()