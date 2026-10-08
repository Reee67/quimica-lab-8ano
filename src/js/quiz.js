import { quizQuestions } from '../data/quiz.js';

export function renderQuiz() {
  return `
    <div class="quiz-container">
      <div class="quiz-start" id="quizStart">
        <h2 class="quiz-title">Teste seus conhecimentos</h2>
        <p class="quiz-subtitle">15 perguntas sobre química e a tabela periódica</p>
        <button class="quiz-start-btn" id="quizStartBtn">Começar Quiz</button>
      </div>
      <div class="quiz-game" id="quizGame" style="display:none;">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" id="quizProgressBar"></div>
        </div>
        <div class="quiz-question-num" id="quizQNum"></div>
        <h3 class="quiz-question" id="quizQuestion"></h3>
        <div class="quiz-options" id="quizOptions"></div>
        <div class="quiz-feedback" id="quizFeedback" style="display:none;"></div>
      </div>
      <div class="quiz-results" id="quizResults" style="display:none;"></div>
    </div>
  `;
}

let currentQ = 0;
let score = 0;
let answered = false;

export function setupQuiz() {
  document.getElementById('quizStartBtn').addEventListener('click', startQuiz);
}

function startQuiz() {
  currentQ = 0;
  score = 0;
  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('quizGame').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  answered = false;
  const q = quizQuestions[currentQ];
  const total = quizQuestions.length;

  document.getElementById('quizQNum').textContent = `Pergunta ${currentQ + 1} de ${total}`;
  document.getElementById('quizProgressBar').style.width = `${((currentQ) / total) * 100}%`;
  document.getElementById('quizQuestion').textContent = q.question;

  const optsHtml = q.options.map((opt, i) => `
    <button class="quiz-option" data-idx="${i}">
      <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
      <span class="opt-text">${opt}</span>
    </button>
  `).join('');

  document.getElementById('quizOptions').innerHTML = optsHtml;
  document.getElementById('quizFeedback').style.display = 'none';

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const idx = parseInt(btn.dataset.idx);
      selectAnswer(idx, q);
    });
  });
}

function selectAnswer(idx, q) {
  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');

  options.forEach((opt, i) => {
    opt.disabled = true;
    if (i === q.correct) {
      opt.classList.add('correct');
    } else if (i === idx) {
      opt.classList.add('wrong');
    }
  });

  if (idx === q.correct) {
    score++;
    feedback.innerHTML = `<div class="feedback-correct"><span>&#10003;</span> Correto! ${q.explanation}</div>`;
  } else {
    feedback.innerHTML = `<div class="feedback-wrong"><span>&#10007;</span> Resposta incorreta. ${q.explanation}</div>`;
  }
  feedback.style.display = 'block';

  const isLast = currentQ >= quizQuestions.length - 1;
  const nextBtn = `<button class="quiz-next-btn" id="quizNextBtn">${isLast ? 'Ver Resultado' : 'Próxima Pergunta'}</button>`;
  feedback.innerHTML += nextBtn;

  document.getElementById('quizNextBtn').addEventListener('click', () => {
    if (isLast) {
      showResults();
    } else {
      currentQ++;
      showQuestion();
    }
  });
}

function showResults() {
  const total = quizQuestions.length;
  const pct = Math.round((score / total) * 100);

  let msg = '';
  let emoji = '';
  if (pct === 100) { msg = 'Perfeito! Você é um verdadeiro químico!'; emoji = '🏆'; }
  else if (pct >= 80) { msg = 'Excelente! Seus conhecimentos são sólidos.'; emoji = '🎉'; }
  else if (pct >= 60) { msg = 'Bom trabalho! Continue estudando.'; emoji = '👍'; }
  else if (pct >= 40) { msg = 'Você está no caminho. Revise o conteúdo.'; emoji = '📚'; }
  else { msg = 'Não desanime. Tente novamente!'; emoji = '🔄'; }

  document.getElementById('quizGame').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';
  document.getElementById('quizResults').innerHTML = `
    <div class="results-card">
      <div class="results-emoji">${emoji}</div>
      <div class="results-score">${score}/${total}</div>
      <div class="results-pct">${pct}% de acerto</div>
      <p class="results-msg">${msg}</p>
      <button class="quiz-start-btn" id="quizRetryBtn">Tentar Novamente</button>
    </div>
  `;

  document.getElementById('quizRetryBtn').addEventListener('click', startQuiz);
}
