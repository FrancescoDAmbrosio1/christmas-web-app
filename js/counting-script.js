
const daysElm = document.querySelector('#days');
const hoursElm = document.querySelector('#hours');
const minutesElm = document.querySelector('#minutes');
const secondsElm = document.querySelector('#seconds');
const daysElm2 = document.querySelector('#days2');
const panelElm = document.querySelector('.panel');
const endDate = new Date('December 25 2024');
const endDateInMs = endDate.getTime();



//tabella in ms
const secondsInMs = 1000;
const minutesInMs = 60 * secondsInMs;
const hoursInMs = 60 * minutesInMs;
const daysInMs= 24 * hoursInMs;



//funzione setInterval che mi fa ripetere l'operazione ogni 1000ms
const counterTimer = setInterval(timer, 1000); 

function timer() {
    //oggi in ms con la differenza per sapere quanti ms tra natale e la data odierna
    const nowInMs=new Date().getTime();

    const diff = endDateInMs - nowInMs;

    if(diff > 0) {
        daysElm.innerHTML = Math.floor(diff/daysInMs);
        daysElm2.innerHTML = Math.floor(diff/daysInMs)
        hoursElm.innerHTML = Math.floor((diff % daysInMs) / hoursInMs);
        minutesElm.innerHTML = Math.floor((diff % hoursInMs) / minutesInMs);
        secondsElm.innerHTML =Math.floor((diff % minutesInMs) / secondsInMs);
    }
    else {
        clearInterval(timer);
        panelElm.innerHTML = "<h1>BUON NATALE</h1>";
    }    

    
}