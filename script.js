const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HotMail", correct: false },
      { text: "How to Make Lasagna", correct: false },
      { text: "HyperTransfer Markup Language", correct: false },
    ],
  },
  {
    question: "How many tags are in a regular HTML element?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question:
      "What is the difference between an opening tag and a closing tag?",
    answers: [
      { text: "Opening tag has a / in front.", correct: false },
      { text: "Closing tag has a / in front.", correct: true },
      { text: "There is no difference.", correct: false },
      { text: "All of them above", correct: false },
    ],
  },
  {
    question: "< br  / > What type of tag is this?",
    answers: [
      { text: "Break tag", correct: true },
      { text: "A broken one", correct: false },
      { text: "An opening tag", correct: false },
      { text: "none of them", correct: false },
    ],
  },
  {
    question: "Which is the correct way to tag an image?",
    answers: [
      { text: "src=”image.jpg/gif” alt=”type some text", correct: false },
      { text: "Src=”image.jpg/gif” alt=type some text", correct: false },
      {
        text: "< img src='image.jpg/gif' alt='type some text'>",
        correct: true,
      },
      { text: "First one is correct", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
