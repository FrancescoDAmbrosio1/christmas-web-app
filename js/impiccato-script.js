// numero max di lettere è 10
const words = [
    'ABBRACCIO','ABETE','ADDOBBO','ADORNARE','AGRIFOGLIO','ALBERO',
    'ALLEGRIA','AMICIZIA','ANICE','AUGURI','AVVENTO','BASTONCINO',
    'BEFANA','BISCOTTI','BRINA','CALENDARIO','CALZA','CAMINETTO','CAMINO',
    'CAMPANA','CANDELA','CANDELIERE','CANNELLA','CANZONE','CAPPELLO',
    'CARAMELLE','CARBONE','CARTE','CASTAGNE','CENONE','CENA','CHAMPAGNE',
    'CHRISTMAS','CIOCCOLATA','COMETA','CORO','COTECHINO','DICEMBRE',
    'DOLCI','DOLCIUMI','DONI','ELFO','FAMIGLIA','FAVOLA','FELTRINO',
    'FIAMMIFERO','FIOCCO','FUOCO','GHIRLANDA','GIOCATTOLI','GUANTI',
    'INCENSO','LANTERNA','LEGNA','LENTICCHIE','LETTERINA','LISTA','LUCI',
    'LUMINARIE','MAGLIONE','MERCATINO','MONOPOLI','NASTRO','NATALE',
    'NATALIZIO','NATIVITA','NEVE','PALLA-NEVE','PALLINA','PANDORO',
    'PANETTONE','PIGNA','PRESEPE','RE-MAGI','REGALO','RENNA','ROTOLO',
    'SANTACLAUS','SCIARPA','SETTEMEZZO','SLITTA','SPUMANTE','STATUINA',
    'STELLA','STRUFFOLI','TABOO','TAVOLA','TOMBOLA','TORRONE','TORTELLINI',
    'VIN-BRULE','VISCHIO','ZENZERO'
]

const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'
]



// recupero gli elementi dal DOM
const alphabetLetter = document.querySelector('#alphabet');
const attempCounting = document.querySelector('#attemp-remaining');
const modal = document.querySelector('#modal');
const modalButton = document.querySelector('#modalButton');
const babboImpiccatoImg = document.querySelector('#img-babbo-going-impiccato');
let attempCounter = 7;
let countingEnd = 0;
attempCounting.innerHTML = attempCounter;
babboImpiccatoImg.innerHTML = 
        `<img class="img-babbo-going" src="./images/impiccato/7.PNG" 
                alt="babbo natale che cammina verso il palo di impiccagione">`;


const arraySplitted = new Array();

document.onload = startGame();

modalButton.addEventListener('click', function(){
    closeModal();
  })

// render caselle alfabeto
function renderLetter(){
    for(let i = 0 ; i <alphabet.length ; i++){
        const letter = createLetter(i);
        alphabetLetter.innerHTML += letter;
    }
}

// funzione per creare caselle dell'alfabeto
function createLetter(i){
    const element = alphabet[i];
    return `<div id="letter-impiccato-alphabet" class="letter-impiccato-alphabet bgCustomGreenGrinch" value="${element.toLowerCase()}">${element}</div>`;
}

// funzione per scegliere una parola random

function randomWord(){
    return parseInt(Math.random()*words.length );
}

function renderWord(){
    const wordToFind = document.querySelector('#word-to-find');
    const index = randomWord();
    const splittedWord = words[index].split('');
    for(let i = 0 ; i < splittedWord.length ; i++){
        arraySplitted.push(splittedWord[i]);
        if(splittedWord[i] == '-'){
            wordToFind.innerHTML +=`<div class="letter-impiccato-card col-1">
                                        <div class=" unshow ${splittedWord[i]}">${splittedWord[i]}</div>
                                    </div>`
            countingEnd += 1;
        } else {
            wordToFind.innerHTML +=`<div class="letter-impiccato-card col-1">
                                        <div class="letter-inside unshow ${splittedWord[i]}">${splittedWord[i]}</div>
                                    </div>`
        }
    }
} 

// funzione per prendere le lettere dell'alfabeto dal DOM
function alphabetLetterFromDom(){
    const alphabetLetter = document.getElementsByClassName('letter-impiccato-alphabet');
    const arrayAlphabetLetters = [...alphabetLetter];
    let lettervalue = "";
    for(let j = 0 ; j < arrayAlphabetLetters.length ; j++){
        arrayAlphabetLetters[j].addEventListener('click', function(){
            arrayAlphabetLetters[j].classList.toggle('selected');
            lettervalue = arrayAlphabetLetters[j].innerHTML;
            verifySelectedLetter(lettervalue);
        })
    }
}


// funzione per verificare se lettera fresente
function verifySelectedLetter(lettervalue){
    let foundLetter = false;
    for(let i = 0; i < arraySplitted.length ; i++){
        if(arraySplitted[i] == lettervalue){
            foundLetter = true
            const letterSplitted = document.getElementsByClassName(lettervalue);
            const arrayLetterSplitted = [...letterSplitted];
            arrayLetterSplitted.forEach(element => {
                element.classList.remove('letter-inside');
            });
            countingEnd += 1;
        }
        verifyCountingEnd(arraySplitted.length);
    }
    if(foundLetter == false){
        attempCount();
    }
    if(attempCounter == 0){
    openModalLose();
    }
}

// funzione per scalare contatore
function attempCount(){
    attempCounter -=1;
    attempCounting.innerHTML = attempCounter;
    babboImpiccatoImg.innerHTML = 
        `<img class="img-babbo-going" src="./images/impiccato/${attempCounter}.PNG" 
                alt="babbo natale che cammina verso il palo di impiccagione">`;
}

// funzione di fine gioco
function verifyCountingEnd(arraySplittedLenght){
    if(countingEnd == arraySplittedLenght){
        openModalWin();
    } 
}

// funzione per aprire la modale
function openModalWin(){
    const modalContent = document.querySelector('#modalContent');
    modalContent.innerHTML=`<div class="container bgCustomBlack">
              <div class="modal-header fontCustom bgCustomBlack fontCustomColorRed d-flex justify-content-center mb-3">
                  <h1 class="modal-title text-center fs-1 fw-bold p-2" id="exampleModalLabel">Gioco Finito!!!</h1>
              </div>
              <div class="modal-body fontCustom bgCustomBlack fontCustomColorGreenGrinch">
                      <div class="col d-flex  mb-3">
                         <h3>Complimenti hai indovinato la parola nascosta</h3>
                      </div>
              </div>
          </div>`
    modal.classList.remove('modal-hidden');
  }

  function openModalLose(){
    const modalContent = document.querySelector('#modalContent');
    modalContent.innerHTML=`<div class="container bgCustomBlack">
              <div class="modal-header fontCustom bgCustomBlack fontCustomColorRed d-flex justify-content-center mb-3">
                  <h1 class="modal-title text-center fs-1 fw-bold" id="exampleModalLabel">Gioco Finito!!!</h1>
              </div>
              <div class="modal-body fontCustom bgCustomBlack fontCustomColorGreenGrinch">
                  <div class="row">
                      <div class="col-4 d-flex">
                          <img class="align-self-center" id="modalImage" src="/images/Grinch-Icon.webp" alt="logo di gioco">
                      </div>
                      <div class="col-8 d-flex  mb-3">
                         <h3>Peccato non hai indovinato la parola nascosta</h3>
                      </div>
                  </div>
              </div>
          </div>`
    modal.classList.remove('modal-hidden');
  }
  
  // funzione per chiudere la modale
  function closeModal(){
    modal.classList.add('modal-hidden');
    location.reload();
  }

// funzione start game
function startGame(){
    renderLetter();
    renderWord();
    alphabetLetterFromDom();
    
}