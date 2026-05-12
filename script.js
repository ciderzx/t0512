// script.js - dynamic 구구단 UI with confetti

document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('tableButtons');
  const gridContainer = document.getElementById('multiplicationGrid');

  // Create number buttons 2-9
  for (let i = 2; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.textContent = `${i}단`;
    btn.dataset.table = i;
    btn.addEventListener('click', () => showTable(i));
    buttonContainer.appendChild(btn);
  }

  function showTable(table) {
    // Clear previous grid
    gridContainer.innerHTML = '';
    // Create 9 results
    for (let j = 1; j <= 9; j++) {
      const cell = document.createElement('div');
      cell.textContent = `${table} × ${j} = ${table * j}`;
      gridContainer.appendChild(cell);
    }
    // Trigger confetti celebration
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }
});
