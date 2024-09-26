// array di oggetti carte
const cards = [
  { "url" : "/images/memory/1.PNG",
    "name" : 1
  },
  { "url" : "/images/memory/1.PNG",
    "name" : 1
  },
  { "url" : "/images/memory/2.PNG",
    "name" : 2
  },
  { "url" : "/images/memory/2.PNG",
    "name" : 2
  },
  { "url" : "/images/memory/3.PNG",
    "name" : 3
  },
  { "url" : "/images/memory/3.PNG",
    "name" : 3
  },
  { "url" : "/images/memory/4.PNG",
    "name" : 4
  },
  { "url" : "/images/memory/4.PNG",
    "name" : 4
  },
  { "url" : "/images/memory/5.PNG",
    "name" : 5
  },
  { "url" : "/images/memory/5.PNG",
    "name" : 5
  },
  { "url" : "/images/memory/6.PNG",
    "name" : 6
  },
  { "url" : "/images/memory/6.PNG",
    "name" : 6
  },
  { "url" : "/images/memory/7.PNG",
    "name" : 7
  },
  { "url" : "/images/memory/7.PNG",
    "name" : 7
  },
  { "url" : "/images/memory/8.PNG",
    "name" : 8
  },
  { "url" : "/images/memory/8.PNG",
    "name" : 8
  }
]

// recupero gli elementi dal DOM
const buttonRestart = document.querySelector('#buttonStart');
const memoryContainer = document.querySelector('#cards-container');
const minuteHtml = document.querySelector('#minute');
const secondHtml = document.querySelector('#second');
const centsHtml = document.querySelector('#cents');
const modal = document.querySelector('#modal');
const modalButton = document.querySelector('#modalButton');
const record = document.querySelector('#memory-game-record');

let crono;
let minute = "";
let second = "";
let cents =  "";
let couplesFinded = 0;

// localStorage.clear();

let memoryRecord = {
    "minuti" : "",
    "secondi" : "",
    "centesimi" : ""
  } ;

let prevoiusMemoryGameRecord = localStorage.getItem('memory-game-record');
if(prevoiusMemoryGameRecord){
  const prevoiusRecord = JSON.parse(prevoiusMemoryGameRecord);
  record.innerHTML = `${prevoiusRecord.minuti}' ${prevoiusRecord.secondi}" ${prevoiusRecord.centesimi} cent`;
} else {
  record.innerHTML =` 00`;
}

document.onload = startGame();


buttonRestart.addEventListener('click', function(){
  resetTimer();
  startGame()
});

modalButton.addEventListener('click', function(){
  closeModal();
})




// funzione di rendering card
function renderCards(){
    for(let i = 0 ; i < 16 ; i++){
        const memoryCard = createCard(i);
        memoryContainer.innerHTML += memoryCard;
    }
}


// funzione per creare le card
function createCard(i){
    const element = cards[i];
    return ` <div class="col-3">
                    <div class="memory-card text-center m-2 bgCustomGreenGrinch rounded-2 justify-content-center">
                        <img value="${element.name}" class="memory-card-img" src="${element.url}">
                    </div>
                </div>`;
}

//funzione per mischiare le carte
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  
    return cards;
  }


//   funzione timer
function startTimer() {
  crono =setInterval(timer, 10);

}

function resetTimer() {
  clearInterval(crono);
  minute = 0;
  second = 0;
  cents = 0;
       
  minuteHtml.innerHTML = `00`;
  secondHtml.innerHTML = `00`;
  centsHtml.innerHTML = `00`;
}
      

function timer () {
	if (cents < 99) {
		cents++;
		if (cents < 10) { cents = "0" + cents }
		centsHtml.innerHTML = ":" + cents;
	}
	if (cents == 99) {
		cents = -1;
	}
	if (cents == 0) {
		second ++;
		if (second < 10) { second = "0" + second }
		secondHtml.innerHTML = ":" + second;
	}
	if (second == 59) {
		second = -1;
	}
	if ( (cents == 0)&&(second == 0) ) {
		minute++;
		if (minute < 10) { minute = "0" + minute }
		minuteHtml.innerHTML = ":" + minute;
	}
	if (minute == 59) {
		minute = -1;
	}
}

// logica di gioco
function displayCard(i){
  const card = document.getElementsByClassName('memory-card-img');
  const arrayCards = [...card];
  this.classList.toggle('show');
  this.classList.toggle('selected');
  arrayCheck.push(this.src);
  if(arrayCheck.length == 2){
    if(arrayCheck[0] == arrayCheck[1]){
      for(let j = 0 ; j < cards.length ; j++){
        if(cards[j].url.substr(-5,1) == arrayCheck[0].substr(-5,1)){
          setTimeout(function(){
            arrayCards[j].classList.toggle('find');
          },300);
        }
      }
      couplesFinded ++;
    } 
    setTimeout(function(){
      for(let i = 0 ; i <arrayCards.length ; i++){
          arrayCards[i].classList.remove('show');
          arrayCards[i].classList.remove('selected');
      }
      arrayCheck.length = 0;
    },600)
  }
    if(couplesFinded == 8){
      openModal();
    }
};

  
// funzione per aprire la modale
function openModal(){
    const modalContent = document.querySelector('#modalContent');
    modalContent.innerHTML=`<div class="container bgCustomBlack">
              <div class="modal-header fontCustom bgCustomBlack fontCustomColorRed d-flex justify-content-center mb-3">
                  <h1 class="modal-title text-center fs-1 fw-bold" id="exampleModalLabel">Gioco Finito!!!</h1>
              </div>
              <div class="modal-body fontCustom bgCustomBlack fontCustomColorGreenGrinch">
                  <div class="row">
                      <div class="col-4 d-flex">
                          <img class="align-self-center" id="modalImage" src="/christmas-section/images/Grinch-Icon.webp" alt="logo di gioco">
                      </div>
                      <div class="col-8 d-flex align-items-center">
                         <h3>Complimenti... ci hai impiegato <span class="fontCustomColorRed fs-1">${minute}</span> min, 
                         <span class="fontCustomColorRed fs-1">${second}</span> sec e <span class="fontCustomColorRed fs-1">${cents}</span> cent!!!</h3>
                      </div>
                  </div>
              </div>
          </div>`
    modal.classList.remove('modal-hidden');
    recordMemoryGame(minute, second, cents);
}
  
// funzione per chiudere la modale
function closeModal(){
    modal.classList.add('modal-hidden');
    resetTimer();
    startGame()
}
  
// funzione per aggiungere testo alla modale
function addModalContent(){
    const modalContent = document.querySelector('#modalContent');
    modalContent.innerHTML = `<div class="container bgCustomBlack">
              <div class="modal-header fontCustom bgCustomBlack fontCustomColorRed d-flex justify-content-center mb-3">
                  <h1 class="modal-title text-center fs-1 fw-bold" id="exampleModalLabel">Gioco Finito!!!</h1>
              </div>
              <div class="modal-body fontCustom bgCustomBlack fontCustomColorGreenGrinch">
                  <div class="row">
                      <div class="col-4 d-flex">
                          <img class="align-self-center" id="modalImage" src="/images/Grinch-Icon.webp" alt="logo di gioco">
                      </div>
                      <div class="col-8 d-flex align-items-center">
                         <h3>Complimenti...Hai finito il gioco in <span class="fontCustomColorRed>${minute}</span> min,
                           <span class="fontCustomColorRed>${second}</span> sec e  <span class="fontCustomColorRed>${cents}</span> cent!!!</h3>

                      </div>
                  </div>
              </div>
          </div>`
    recordMemoryGame(minute, second, cents)
}

// funzione di local storage per record
function recordMemoryGame(minute, second, cents){
  if(minute == ""){
    minute = 0;
  }
  const temporaryRecord = {
      "minuti" : minute,
      "secondi" : second,
      "centesimi" : cents
  } ;
  prevoiusMemoryGameRecord = localStorage.getItem('memory-game-record');
  if(prevoiusMemoryGameRecord){
    memoryRecord = JSON.parse(prevoiusMemoryGameRecord);
    if(memoryRecord.minuti == ""){
      memoryRecord.minuti = 0;
    } 
    if(temporaryRecord.minuti < memoryRecord.minuti){
      localStorage.removeItem('memory-game-record');
      localStorage.setItem('memory-game-record', JSON.stringify(temporaryRecord));
      // alert('record minuto superato');
    } else if(temporaryRecord.minuti == memoryRecord.minuti){
        // alert('minuti uguali');
        if (temporaryRecord.secondi < memoryRecord.secondi){
          localStorage.removeItem('memory-game-record');
          localStorage.setItem('memory-game-record', JSON.stringify(temporaryRecord));
          // alert('record secondi superato');
        } else if(temporaryRecord.secondi == memoryRecord.secondi){
          // alert('secondi uguali');
          if(temporaryRecord.centesimi < memoryRecord.centesimi){
            localStorage.removeItem('memory-game-record');
            localStorage.setItem('memory-game-record', JSON.stringify(temporaryRecord));
            // alert('record centesimi superato');
          }
          }
      }
  } else {localStorage.setItem('memory-game-record', JSON.stringify(temporaryRecord)); 
    }
  const newRecord = localStorage.getItem('memory-game-record');
  memoryRecord = JSON.parse(newRecord);
  record.innerHTML = `${memoryRecord.minuti}' ${memoryRecord.secondi}" ${memoryRecord.centesimi} cent`;
}

//funzione di avvio gioco
function startGame(){
  memoryContainer.innerHTML="";
  shuffle(cards);
  renderCards();
  arrayCheck = new Array();
  couplesFinded = 0;
  startTimer();
  // assegno ad ogni card l'eventlistner che mostra la carta al click
  const card = document.getElementsByClassName('memory-card-img');
  const arrayCards = [...card];
  for(let i = 0 ; i < cards.length ; i++){
    arrayCards[i].addEventListener('click',displayCard);
  }
}