const questions = [
  "Як вас звати?",
  "Скільки вам років?",
  "Яке ваше місто проживання?",
  "Які у вас хобі?",
  "Що ви очікуєте від цього курсу?"
];

let currentIndex = 0;
const answers = new Array(questions.length).fill("");

const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const saveBtn = document.getElementById("saveBtn");
const message = document.getElementById("message");

function render() {
  questionText.innerText = `Питання ${currentIndex + 1}/${questions.length}: ${questions[currentIndex]}`;
  answerInput.value = answers[currentIndex];
  prevBtn.disabled = currentIndex === 0;
  nextBtn.innerText = currentIndex === questions.length - 1 ? "Завершити" : "Далі";
}

function saveCurrentAnswer() {
  answers[currentIndex] = answerInput.value.trim();
}

prevBtn.addEventListener("click", () => {
  saveCurrentAnswer();
  currentIndex--;
  render();
});

nextBtn.addEventListener("click", () => {
  saveCurrentAnswer();
  if (!answers[currentIndex]) {
    message.innerText = "Будь ласка, введіть відповідь.";
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    render();
    message.innerText = "";
  } else {
    message.innerText = "Опитування завершено. Можна зберігати.";
  }
});

saveBtn.addEventListener("click", async () => {
  saveCurrentAnswer();

  const payload = questions.map((q, i) =>
    `${i + 1}. ${q}\nВідповідь: ${answers[i]}\n`
  ).join("\n");

  const result = await window.api.saveAnswer(payload);
  message.innerText = result.message;
});

render();