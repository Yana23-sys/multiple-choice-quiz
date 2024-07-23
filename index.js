// An array of objects, each representing a quiz question, possible answers, and the correct answer
const questions = [
    {
        question: "Where is the world tallest building located?",
        answers: ["Africa", "California", "Dubai", "Italy"],
        correctAnswer: "Dubai"
    },
    {
        question: "What is the capital city of UK?",
        answers: ["London", "Manchester", "Leeds", "Birmingham"],
        correctAnswer: "London"
    },
    {
        question: "What galaxy do we live in?",
        answers: ["Andromeda", "Centaurus", "Solar system", "The Milky Way"],
        correctAnswer: "The Milky Way"
    },
    {
        question: "Which planet is known as the 'Blue Planet'?",
        answers: ["Mars", "Earth", "Mercury", "Jupiter"],
        correctAnswer: "Earth"
    },
    {
        question: "Who gave the U.S. The Statue of Liberty?",
        answers: ["They built it themselves", "Spain", "France", "The United Kingdom"],
        correctAnswer: "France"
    }
]

// Initialize variables to track the current question index, score, and selected answer
let currentQuestionIndex = 0
let score = 0
let selectedAnswer = ''
// checks if the current question is the last one
const isLastQuestion = () => currentQuestionIndex === questions.length -1


// Get references to HTML elements for updating the DOM
const questionNumElement = document.getElementById('question-number')
const questionTextElement = document.getElementById('question-text')
const scoreElement = document.getElementById('score')
const nextButton = document.getElementById('next-question')
const answerButtons = document.getElementsByClassName('answer-button')



// update html elements to display current question (each from arr) and answers 
const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex]
    questionNumElement.innerText = currentQuestionIndex +1
    questionTextElement.innerText = currentQuestion.question

    // HTML array-like collection (with buttons elements objs) -> array
    const answersArray = [...answerButtons]
    
    answersArray.forEach((answerButton,i)=>{
        answerButton.innerText = currentQuestion.answers[i]
        answerButton.classList.remove("pressed")

        // event listener to each button -> reassigns var each time (to handle answer selection)
        answerButton.addEventListener('click', () => {
            selectedAnswer = currentQuestion.answers[i]
            answersArray.forEach(b => b.classList.remove("pressed"))
            answerButton.classList.add("pressed")
        })
    })
}


// when button "next question" has been pressed go to next one
const displayNextQuestion = () => {
    // not allow go to next question without selecting answer
    if (selectedAnswer) {
        checkAnswerAndIncreaseScore(selectedAnswer)

    // Updates the score and moves to the next question 
    // or shows the result if it’s the last question
        if (isLastQuestion()) {
            showResult()
        } else {
            currentQuestionIndex++
            selectedAnswer = ''
            renderQuestion()
        }
    }
}

// Compares the selected answer to the correct answer and increments the score if correct
const checkAnswerAndIncreaseScore = (answer) => {
    const currentQuestion = questions[currentQuestionIndex]
    if(answer === currentQuestion.correctAnswer){
        score ++
        scoreElement.innerText = score
    }
}


// Hide all buttons and displays the final score
const showResult = () => {
    const buttons = [...answerButtons, nextButton]
    buttons.forEach(b => b.style.display = 'none')
    questionTextElement.innerText = `Your final score is: ${score} out of ${questions.length}!`
}


// Add event listener to the "Next Question" button to trigger func and go to the next question
nextButton.addEventListener('click', displayNextQuestion)

// Renders the first question when the page loads
renderQuestion()

