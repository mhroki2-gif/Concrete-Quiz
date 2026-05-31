let current = 0;
let score = 0;

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const categorySelect = document.getElementById("category");

let filteredQuestions = questions;

showQuestion();

categorySelect.addEventListener("change", resetQuiz);

function showQuestion() {
  const q = filteredQuestions[current];

  quiz.innerHTML = `
    <p>${current + 1} / ${filteredQuestions.length} 問目</p>
    <h2>${q.question}</h2>
  `;

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    quiz.appendChild(btn);
  });

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "最初からやり直す";
  resetBtn.onclick = resetQuiz;
  quiz.appendChild(resetBtn);
}

function checkAnswer(index) {
  const q = filteredQuestions[current];

  if (index === q.answer) {
    alert("正解！\n" + q.explanation);
    score++;
  } else {
    alert("不正解\n" + q.explanation);
  }

  current++;

  if (current >= filteredQuestions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  quiz.innerHTML = "";

  result.innerHTML = `
    <h2>結果</h2>
    <p>${score} / ${filteredQuestions.length} 問正解</p>
    <button onclick="resetQuiz()">もう一度最初から解く</button>
  `;
}

function resetQuiz() {
  current = 0;
  score = 0;
  result.innerHTML = "";

  const selectedCategory = categorySelect.value;

  if (selectedCategory === "all") {
    filteredQuestions = questions;
  } else {
    filteredQuestions = questions.filter(q => q.category === selectedCategory);
  }

  showQuestion();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
