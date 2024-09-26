// prendo gli elementi del DOM che mi servono
const adventCalendar = document.querySelector('#calendar');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('modal-content')
const modalButton = document.querySelector('#modalButton');

// Genero elenco con gli indici delle finestrelle aperte
let openedIndexes = [];
console.log(openedIndexes);

// localStorage.clear();

// Controllo subito se c'erano degli indici salvati! 
const previouslyOpenedIndexes = localStorage.getItem('my-list');

// Se ci sono indici salvati
if (previouslyOpenedIndexes) {
  openedIndexes = JSON.parse(previouslyOpenedIndexes);
  console.log(openedIndexes);
}


// Rendering delle caselle
for (let i = 0; i < 25; i++){
    const adventBox = createBox(i);
    adventCalendar.innerHTML += adventBox;
}

// click sulle caselle
const boxButtons = document.querySelectorAll('.box-button');
for(let i = 0 ; i < boxButtons.length; i++){
    const button = boxButtons[i];
    button.addEventListener('click', function(){
        if(verifyDate(i) == true){
            button.classList.add('box-opened');
            insertModalContent(i);
            openModal();
            addToOpenedIndexes(i);
        }else {
            insertModalErrorContent();
            openModal()
        }
    })
}

//chiusura modale
modalButton.addEventListener('click', function(){
    closeModal()
})


// funzione per generare nuova casella
function createBox(i){
    let classes = "box"
    //controllo se presenti caselle gia aperte
    if (openedIndexes.includes(i)) {
        classes += " box-opened";
      }
    if(i == 24){
        return `<div class="col col-md-4">
            <div class="card text-center mb-3 rounded-4 ">
                <div class="card-body bgCustomGreenGrinch adventCard rounded-4 justify-content-center">
                    <h1 class="bungee">${i+1}</h1>
                    <button type="button" class="button box-button ${classes}">Apri</button>
                </div>
            </div>
        </div>`
    }

return `<div class="col-4 col-md-2">
            <div class="card text-center mb-3 rounded-4 ">
                <div class="card-body bgCustomGreenGrinch adventCard rounded-4 justify-content-center">
                    <h1 class="bungee">${i+1}</h1>
                    <button type="button" class="button box-button ${classes}">Apri</button>
                </div>
            </div>
        </div>`

}

//funzione per aprire la modale
function openModal(){
    modal.classList.remove('modal-hidden');
}

//funzione per chiudere la modale
function closeModal(){
    modal.classList.add('modal-hidden');
}

// funzione per aggiungere img alla modale
function insertModalContent(i){
    const element = images[i];
    const modalImage = document.querySelector('#modalImg');
    modalImage.innerHTML = `<img id="modalImg" src="${element.url}" alt="${element.name}">`
}

//funzione per aggiungere errore alla modale
function insertModalErrorContent(){
    const modalImage = document.querySelector('#modalImg');
    modalImage.innerHTML = `<div class="container bgCustomBlack">
              <div class="modal-header fontCustom bgCustomBlack fontCustomColorRed d-flex justify-content-center mb-3">
                  <h1 class="modal-title text-center fs-1 fw-bold" id="exampleModalLabel">Erroreeeeeeeeeeeee!!!</h1>
              </div>
              <div class="modal-body fontCustom bgCustomBlack fontCustomColorGreenGrinch">
                  <div class="row">
                      <div class="col-4 d-flex">
                          <img class="align-self-center" id="modalImage" src="/images/Grinch-Icon.webp" alt="logo di gioco">
                      </div>
                      <div class="col-8 d-flex align-items-center">
                         <h3>Sbagliatoooo!!! Troppo presto per aprire questa casella...</h3>
                      </div>
                  </div>
              </div>
          </div>`
}

// Funzione per aggiungere l'indice alla lista
function addToOpenedIndexes(i) {
    if (!openedIndexes.includes(i)) {
      openedIndexes.push(i);
      localStorage.setItem('my-list', JSON.stringify(openedIndexes));
    }
  }


// funzione per generare e verificare data
function verifyDate(i){
    let result = false;
    let todayDate = new Date();
    let day;
    let month;
    let year;

    day = todayDate.getDate();
    month = todayDate.getMonth() + 1;
    year = todayDate.getFullYear();
    let boxDay = images[i];
    if(year == boxDay.year){
        if(month == boxDay.month){
         if(boxDay.day <= day){
            result = true;
         }   
        }
    }
    
    return result;
}

