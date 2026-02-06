const allQuestions = {
  national: [
    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Chennai"], correct: 1 },
    { question: "Who is the Father of the Nation?", options: ["Nehru", "Gandhi", "Bose"], correct: 1 },
    { question: "Which is the national animal of India?", options: ["Lion", "Tiger", "Elephant"], correct: 1 }
  ],
  international: [
    { question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin"], correct: 0 },
    { question: "Which country hosted 2021 Olympics?", options: ["China", "Japan", "USA"], correct: 1 },
    { question: "Which is the largest ocean?", options: ["Indian", "Atlantic", "Pacific"], correct: 2 }
  ]
};

let selectedCategory = "";
let questionLimit = 0;
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const categoryCards = document.querySelectorAll(".category-option");
const countButtons = document.querySelectorAll(".question-count button");
const startBtn = document.querySelector(".start-quiz-btn");

const configContainer = document.querySelector(".config-container");
const quizContainer = document.querySelector(".quiz-container");
const questionText = document.querySelector(".question-text");
const answerOptions = document.querySelector(".answer-options");
const questionStatus = document.querySelector(".question-status");
const timerText = document.querySelector(".time-duration");
const nextBtn = document.querySelector(".next-question-btn");

/* CATEGORY SELECT */
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    categoryCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedCategory = card.dataset.category;
  });
});

/* QUESTION COUNT */
countButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    countButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    questionLimit = Number(btn.dataset.count);
  });
});

/* START QUIZ */
startBtn.addEventListener("click", () => {
  if (!selectedCategory || !questionLimit) {
    alert("Please select category and number of questions");
    return;
  }

  questions = allQuestions[selectedCategory].slice(0, questionLimit);
  configContainer.style.display = "none";
  quizContainer.style.display = "block";

  loadQuestion();
  startTimer();
});

/* LOAD QUESTION */
function loadQuestion() {
  answerOptions.innerHTML = "";
  const q = questions[currentQuestion];

  questionText.textContent = q.question;
  questionStatus.textContent = `${currentQuestion + 1} of ${questions.length}`;

  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.className = "answer-option";
    li.textContent = opt;
    li.onclick = () => selectAnswer(li, index);
    answerOptions.appendChild(li);
  });
}

/* ANSWER */
function selectAnswer(selected, index) {
  clearInterval(timer);
  const correct = questions[currentQuestion].correct;

  [...answerOptions.children].forEach(opt => opt.style.pointerEvents = "none");

  if (index === correct) {
    selected.style.background = "#b6f7c1";
    score++;
  } else {
    selected.style.background = "#f7b6b6";
    answerOptions.children[correct].style.background = "#b6f7c1";
  }
}

/* NEXT */
nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    timeLeft = 15;
    loadQuestion();
    startTimer();
  } else {
    quizContainer.innerHTML = `
      <h2>Quiz Completed 🎉</h2>
      <p>Score: ${score}/${questions.length}</p>
      <button onclick="location.reload()" class="start-quiz-btn">Restart</button>
    `;
  }
};

/* TIMER */
function startTimer() {
  timerText.textContent = timeLeft + "s";
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft + "s";
    if (timeLeft === 0) nextBtn.click();
  }, 1000);
}