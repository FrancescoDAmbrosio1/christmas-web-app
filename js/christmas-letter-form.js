// prendo gli elementi dal DOM
const policy = document.querySelector('#policy-santa-claus');
const modalPrivacy = document.querySelector('#modal');
const modalPrivacyButton = document.querySelector('#modalButton');
const modalPreview = document.querySelector('#modal-preview');
const modalPreviewContent = document.querySelector('#modal-preview-content');
const modalResult = document.querySelector('#modal-result');
const modalResultButton = document.querySelector('#modal-result-button');
const modalModifyButton = document.querySelector('#modal-modify-button');



// apertura modale policy
policy.addEventListener('click', function(){
    openModal(modalPrivacy);
})

//chiusura modale policy
modalPrivacyButton.addEventListener('click', function(){
    closeModal(modalPrivacy);
})

//chiusura modale anteprima
modalModifyButton.addEventListener('click', function(){
  closeModal(modalPreview);
})

const form = document.getElementById('letter-form')
form.addEventListener('submit', previewCreation)

//funzione per aprire la modale
function openModal(modalName){
    modalName.classList.remove('modal-hidden');
}

//funzione per chiudere la modale
function closeModal(modalName){
    modalName.classList.add('modal-hidden');
}

// funzione per la creazione della preview
function previewCreation(e){
    e.preventDefault();
    const nameForm = document.getElementById('inputName');
    let name = nameForm.value;
    const surnameForm = document.getElementById('inputSurname');
    let surname = surnameForm.value;
    const addressForm = document.getElementById('inputAddress');
    let address = addressForm.value;
    const emailForm = document.getElementById('inputEmail');
    let email = emailForm.value;
    const cityForm = document.getElementById('inputCity');
    let city = cityForm.value;
    const stateForm = document.getElementById('inputState');
    let state = stateForm.value;
    const capForm = document.getElementById('inputZip');
    let cap = capForm.value;
    const textForm = document.getElementById('textarea');
    let text = textForm.value;
    openModal(modalPreview);
    modalPreviewContent.innerHTML = ` 
          <div class="letter-box">
                <div class="row">
                  <div class="col letter-sender p-2 fontCustom ">
                    <div class="fontCustomColorRed mb-4">Mittente: </div>
                      <ul>
                        <li>${surname} ${name}</li>
                        <li><u>Indirizzo:</u> ${address}</li>
                        <li> ${city} - ${cap} - ${state} </li>
                      </ul>
                  </div>
                </div>
                <div class="row justify-content-center letter-text fontCustom ps-4">
                  ${text}
                </div>
              </div>
    `
}

//chiusura modale preview
modalResultButton.addEventListener('click', function(){
    closeModal(modalPreview);
    openModal(modalResult);
    modalResult.innerHTML = `<div class="modal-box-preview">
            <div id="modalImg" class="modal-content mb-3"> 
              <div class=" p-2 bgCustomBlack rounded-3 mb-3">
                <div class="fontCustom fontCustomColorGreenGrinch ">Pensavi veramente di inviare la letterina a Babbo Natale???</div>
                <img class="p-2" src="/images/letterina-risultato.GIF" alt="babbo natale gif"
              </div>
            </div>
            <a href="./index.html"><button class="button">Torna alla Home</button></a>
          </div>
    `
});


// funzione per il countdown di caratteri nella textarea della letterina
const contatore = document.querySelector('#contatore');
const textArea = document.querySelector('#textarea');

const maxChar = 600;
contatore.innerHTML = maxChar
textArea.onkeyup= function() {
  
  let length = textArea.value.length;
  if (length > maxChar){
    alert('ATTENZIONE: Hai superato il limite massimo di ' + maxChar + ' caratteri!');
  } else {
    let charRemained = maxChar - length;
    contatore.innerHTML = charRemained
  }
};
