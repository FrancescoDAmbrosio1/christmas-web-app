// Recupero gli elementi di interesse dalla pagina
const grid = document.querySelector('.grid');
const scoreCounter = document.querySelector('.score-counter');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const endGameScreen = document.querySelector('.end-game-screen');
const playAgainButton = document.querySelector('.play-again');
const finalScore = document.querySelector('.final-score');
const turboButton = document.querySelector('#turbo');
const record = document.querySelector('#grinch-race-record');


// Prepariamo la griglia iniziale
const gridMatrix = [
  ['', '', '', '', '', 'pacco', ''],
  ['', 'albero', '', '', '', '', 'albero'],
  ['', '', 'rock', '', '', '', ''],
  ['rock', '', '', '', '', '', ''],
  ['', '', 'pacco', '', '', 'babbo', ''],
  ['', '', '', '', 'albero', '', ''],
  ['', 'babbo', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', 'rock', ''],
];

//operazioni creazione record da impiegare in localStorage
let grinchRaceRecord = " ";

// localStorage.clear();

// Impostazioni di partenza
let turbo = 1;
let score = 0;
let speed = 500;
let heroPosition = { y: 7, x: 3 };

// # FUNZIONI RELATIVE ALLA GRIGLIA
// Funzione per disegnare la griglia
function renderGrid() {
  // Tolgo gli element di prima per sostituirli..
  grid.innerHTML = '';

  // Per ogni riga della griglia, recupero le celle
  gridMatrix.forEach(function (rowCells) {
    // Per ogni cella, recuper il contenuto
    rowCells.forEach(function (cellContent) {
      // Creo un elemento e gli do classe 'cell'
      const cell = document.createElement('div');
      cell.className = 'cell';

      // Aggiungo anche una classe con lo stesso contenuto della cella
      if (cellContent) cell.classList.add(cellContent);

      // Lo inserisco nella griglia
      grid.appendChild(cell);
    });
  })
}

// Funzione che raggruppa le funzioni di rendering
function renderElements() {
  // Posiziono il kart
  placeHero();

  // Renderizzo la griglia
  renderGrid();

  console.table(gridMatrix);
}

// # FUNZIONI RELATIVE AL KART
// Funzione per posizionare il kart sulla griglia
function placeHero() {
  // Recupero il contenuto della cella in cui dovrò spostare il kart
  const contentBeforeHero = gridMatrix[heroPosition.y][heroPosition.x];

  // Se c'è il bonus, aggiungiamo punti, altrimenti è collisione!
  if (contentBeforeHero === 'grinch') getBonusPoints();
  else if (contentBeforeHero) gameOver();

  // Piazzo il kart sulle coordinate fornite
  gridMatrix[heroPosition.y][heroPosition.x] = 'hero';
}

// Funzione per muovere il kart
function moveHero(direction) {
  // Innanzitutto "sollevo" il kart per piazzarlo da un'altra parte
  gridMatrix[heroPosition.y][heroPosition.x] = '';

  // Sposto il kart a seconda della direzione
  switch (direction) {
    case 'left':
      if (heroPosition.x > 0) heroPosition.x--;
      break;
    case 'right':
      if (heroPosition.x < 6) heroPosition.x++;
      break;
    default:
      gridMatrix[heroPosition.y][heroPosition.x] = 'hero';
  }

  // Rirenderizzo tutti gli elementi
  renderElements();
}

// # FUNZIONI RELATIVE AGLI OSTACOLI
// Funzione per far scorrere gli ostacoli
function scrollObstacles() {
  // Rimuovo temporaneamente il kart: non deve scorrere
  gridMatrix[heroPosition.y][heroPosition.x] = '';

  // Verifichiamo se c'è il bonus in gioco
  const isBonusPresent = checkBonusPresence();

  // Rimuovo e metto da parte l'ultima riga
  let lastRow = gridMatrix.pop();

  // Se non c'è il bonus lo inserisco nella riga
  if (!isBonusPresent) lastRow = insertBonus(lastRow);

  // Mescolo casualmente gli elementi
  lastRow = shuffleElements(lastRow);

  // La reinserisco in cima
  gridMatrix.unshift(lastRow);

  // Ridisegno tutto
  renderElements();
}

// Funzione per mescolare casualmente gli elementi di una riga
function shuffleElements(row) {
  for (let i = row.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [row[i], row[j]] = [row[j], row[i]];
  }

  return row;
}

// # FUNZIONI RELATIVE AL BONUS
// Funzione per verificare se c'è un bonus in gioco
function checkBonusPresence() {
  // Verifichiamo se troviamo il bonus
  let bonusFound;

  // Per ogni riga della matrice, recuper le celle
  gridMatrix.forEach(function (rowCells) {
    if (rowCells.includes('grinch')) bonusFound = true;
  })
  return bonusFound;
}

// Funzione per inserire il bonus in una riga
function insertBonus(row) {
  // Individuiamo la posizione della prima cella libera
  const emptyIndex = row.indexOf('');

  // Inseriamo lì il bonus
  row[emptyIndex] = 'grinch';

  // Restituiamo la riga aggiornata
  return row;
}

// Funzione per guadagnare punti bonus
function getBonusPoints() {
  // Incrementiamo lo score
  score += 30;

  // Aggiorniamo il contatore
  scoreCounter.innerText = score;

  // Diamo un feedback all'utente mettendo la classe bonus
  scoreCounter.classList.add('bonus');

  // La rimuoviamo subito dopo in modo da poterla riassegnare nuovamente
  setTimeout(function () {
    scoreCounter.classList.remove('bonus')
  }, 1000);
}

// # FUNZIONI RELATIVE AL TURBO
// Funzione per accelerare 
function turboBoost() {
  // Se non siamo già al massimo
  if (turbo < 4) {
    // Cambiamo l'immagine' e aumentiamo il turbo per aumentare la lancetta
    turboButton.innerHTML = `<img src="/christmas-section/images/gauge-${++turbo}.png">`;

    // incremento la velocità 
    incrementSpeed();
  }
}

// # FUNZIONI RELATIVE A PUNTI E VELOCITA'
// Funzione per incrementare i punti
function incrementScore() {
  scoreCounter.innerText = ++score;
}

// Funzione per incrementare la velocità
function incrementSpeed() {
  // Interrompo il ciclo corrente
  clearInterval(gameLoop);

  // Riduco l'intervallo
  speed -= 100;

  // Rilancio un nuovo flusso con la velocità aggiornata
  gameLoop = setInterval(runGameFlow, speed);
}

// # FUNZIONE DI FINE GIOCO
// Funzione di fine gioco
function gameOver() {
  // Interrompo il flusso
  clearInterval(gameLoop);

  // Preparo il punteggio finale
  finalScore.innerText = score;
  const prevoiusGrinchRaceRecord = localStorage.getItem('grinch-race-record');
  if(prevoiusGrinchRaceRecord){
    grinchRaceRecord = JSON.parse(prevoiusGrinchRaceRecord);
    if(score > prevoiusGrinchRaceRecord) {
        localStorage.removeItem('grinch-race-record');
        localStorage.setItem('grinch-race-record', JSON.stringify(score));
        const newRecord = localStorage.getItem('grinch-race-record');
        grinchRaceRecord = JSON.parse(newRecord);
    }
    record.innerHTML = grinchRaceRecord;
  } else {
    localStorage.setItem('grinch-race-record', JSON.stringify(score));
    record.innerHTML = score;
  }
  endGameScreen.classList.remove('hidden');
  playAgainButton.focus();
}

// # FUNZIONI RELATIVE AL FLUSSO DI GIOCO
// Funzione che raggruppa le operazioni da svolgere ciclicamente
function runGameFlow() {
  incrementScore();
  scrollObstacles();
}

// # CONTROLLI DI GIOCO
// Click sul bottone turbo
turboButton.addEventListener('click', turboBoost);

// Click sul bottone gioca ancora
playAgainButton.addEventListener('click', function () { location.reload() });

// Click sul bottone sinistro
leftButton.addEventListener('click', function () { moveHero('left') });

// Click sul bottone destro
rightButton.addEventListener('click', function () { moveHero('right') });

// Controlli con le freccette
document.addEventListener('keyup', function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      moveHero('left');
      break;
    case 'ArrowRight':
      moveHero('right');
      break;
    case ' ':
      turboBoost();
      break;
    default: return;
  }
})


// # ESECUZIONE FUNZIONI DI GIOCO
// Avvio il flusso di gioco
let gameLoop = setInterval(runGameFlow, speed)