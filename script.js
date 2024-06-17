document.addEventListener("DOMContentLoaded", function() {
  function adjustGrid() {
      const container = document.getElementById('container');
      const cellSize = container.offsetWidth / 10; // Adjust the number of cells per row
      container.style.gridTemplateColumns = `repeat(auto-fill, minmax(${cellSize}px, 1fr))`;
      container.style.gridAutoRows = `${cellSize}px`;
  }

  function initializeGrid() {
      const totalCells = 117;
      let html = '';
      for (let i = 1; i <= totalCells; i++) {
          html += `<div class="cell" id="cell${i}"></div>`;
      }
      document.getElementById('container').innerHTML = html;
      adjustGrid();

      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
          cell.addEventListener('click', function() {
              togglecellOpacity1(cell);
              savecellOpacities1();
              updateCounter();
          });
      });

      loadcellOpacities1();
      updateCounter();
  }

  window.addEventListener('resize', adjustGrid);

  initializeGrid();
});

function togglecellOpacity1(cell) {
  if (cell.style.opacity === '0' || cell.style.opacity === '') {
      cell.style.opacity = '0';
  } else {
      cell.style.opacity = '0';
  }
}

function savecellOpacities1() {
  const cellOpacities1 = {};
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
      cellOpacities1[cell.id] = cell.style.opacity;
  });

  localStorage.setItem('cellOpacities1', JSON.stringify(cellOpacities1));
}

function loadcellOpacities1() {
  const cellOpacities1 = JSON.parse(localStorage.getItem('cellOpacities1'));

  if (cellOpacities1) {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
          if (cellOpacities1[cell.id]) {
              cell.style.opacity = cellOpacities1[cell.id];
          }
      });
  }
}

function updateCounter() {
  const cells = document.querySelectorAll('.cell');
  let count = 0;
  cells.forEach(cell => {
      if (cell.style.opacity === '0') {
          count++;
      }
  });
  document.getElementById('cell-counter').innerText = count;
}

// Event listener para guardar el estado al salir de la página
window.addEventListener('beforeunload', function() {
  savecellOpacities1();
});

// Event listener para cargar el estado al cargar la página
window.addEventListener('load', function() {
  loadcellOpacities1();
  updateCounter();
});
