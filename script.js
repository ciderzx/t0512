document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('tableButtons');
  const gridContainer = document.getElementById('multiplicationGrid');
  const displayArea = document.getElementById('displayArea');
  const learnModeBtn = document.getElementById('learnModeBtn');
  const quizModeBtn = document.getElementById('quizModeBtn');
  const scoreBoard = document.getElementById('scoreBoard');
  const correctEl = document.getElementById('correctCount');
  const totalEl = document.getElementById('totalCount');
  const selectorTitle = document.getElementById('selectorTitle');

  let currentMode = 'learn'; // 'learn' or 'quiz'
  let currentTable = 2;
  let score = { correct: 0, total: 0 };

  // Initialize number buttons 2-9
  const initButtons = () => {
    buttonContainer.innerHTML = '';
    for (let i = 2; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.textContent = `${i}단`;
      if (i === currentTable) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentTable = i;
        updateActiveButton();
        if (currentMode === 'learn') showTable(i);
        else startQuiz(i);
      });
      buttonContainer.appendChild(btn);
    }
  };

  const updateActiveButton = () => {
    document.querySelectorAll('.buttons button').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.textContent) === currentTable);
    });
  };

  // Learn Mode: Show the full table
  const showTable = (table) => {
    displayArea.innerHTML = '<div class="grid" id="multiplicationGrid"></div>';
    const grid = document.getElementById('multiplicationGrid');
    for (let j = 1; j <= 9; j++) {
      const cell = document.createElement('div');
      cell.textContent = `${table} × ${j} = ${table * j}`;
      cell.style.animationDelay = `${j * 0.05}s`;
      grid.appendChild(cell);
    }
    triggerConfetti();
  };

  // Quiz Mode: Start a quiz for a specific table
  const startQuiz = (table) => {
    score = { correct: 0, total: 0 };
    updateScore();
    scoreBoard.style.display = 'block';
    nextQuestion();
  };

  const nextQuestion = () => {
    const multiplier = Math.floor(Math.random() * 9) + 1;
    const correctAnswer = currentTable * multiplier;
    
    // Generate options
    let options = [correctAnswer];
    while (options.length < 4) {
      const wrong = (currentTable + (Math.floor(Math.random() * 3) - 1)) * (Math.floor(Math.random() * 9) + 1);
      const offset = Math.floor(Math.random() * 10) - 5;
      const finalWrong = Math.max(1, wrong + offset);
      if (!options.includes(finalWrong)) options.push(finalWrong);
    }
    options.sort(() => Math.random() - 0.5);

    displayArea.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-question">${currentTable} × ${multiplier} = ?</div>
        <div class="quiz-options">
          ${options.map(opt => `<button onclick="checkAnswer(${opt}, ${correctAnswer}, this)">${opt}</button>`).join('')}
        </div>
      </div>
    `;
  };

  window.checkAnswer = (selected, correct, btn) => {
    score.total++;
    if (selected === correct) {
      score.correct++;
      btn.classList.add('correct');
      triggerConfetti();
      setTimeout(nextQuestion, 1000);
    } else {
      btn.classList.add('wrong');
      // Highlight correct one after a delay
      setTimeout(() => {
        const buttons = document.querySelectorAll('.quiz-options button');
        buttons.forEach(b => {
          if (parseInt(b.textContent) === correct) b.classList.add('correct');
        });
      }, 300);
      setTimeout(nextQuestion, 2000);
    }
    updateScore();
  };

  const updateScore = () => {
    correctEl.textContent = score.correct;
    totalEl.textContent = score.total;
  };

  const triggerConfetti = () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff9a9e', '#fad0c4', '#ff6f61', '#accent']
      });
    }
  };

  // Mode Switching Logic
  learnModeBtn.addEventListener('click', () => {
    currentMode = 'learn';
    learnModeBtn.classList.add('active');
    quizModeBtn.classList.remove('active');
    scoreBoard.style.display = 'none';
    selectorTitle.textContent = '단수를 선택하세요';
    showTable(currentTable);
  });

  quizModeBtn.addEventListener('click', () => {
    currentMode = 'quiz';
    quizModeBtn.classList.add('active');
    learnModeBtn.classList.remove('active');
    selectorTitle.textContent = '퀴즈를 풀 단수를 선택하세요';
    startQuiz(currentTable);
  });

  // Init
  initButtons();
  showTable(currentTable);
});

