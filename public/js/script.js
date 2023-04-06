let hour = document.getElementById('hour');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let am_Pm = document.getElementById('am-pm');

const updateClock = function (){
    const date = new Date();

    let h = date.getHours();
    
    let m = date.getMinutes();
    let s = date.getSeconds();

    let amPm = "PM";

    h >= 12 ? amPm = "PM" : amPm = "AM";
    
    if (h<10) { h = "0" + h } 
    if (m<10) { m = "0" + m }
    if (s<10) { s = "0" + s }
  

    hour.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
    am_Pm.innerHTML = amPm;

    setTimeout(()=>{
        updateClock();
    }, 500);
}

updateClock();

const openAccess = document.getElementById('profile');
const form = document.getElementById('access');
const closeAccess = document.getElementsByClassName('close-access');

openAccess.addEventListener('click', ()=>{
    form.style.display = 'flex';
})

console.log(closeAccess);

for(let i = 0; i<closeAccess.length; i++ ){
    closeAccess[i].addEventListener('click', ()=>{
        form.style.display = 'none';
    })
}

////

function activeTheme(){
    const [active] = document.getElementsByClassName('active');
    return active;
}

function updateTheme(color){
    //try to use call method
    const active = activeTheme();
    document.getElementById('sec0').classList.replace(active.value, color);
    document.getElementById('sec1').classList.replace(active.value, color);
    document.getElementById('sec2').classList.replace(active.value, color)
    document.getElementById('sec3').classList.replace(active.value, color)
    active.classList.remove('active');

    fetch(`/mood-request?mood=${color}`).then(
        response => response.json()
        .then(data=>{
            document.body.style.background = `url(${data.path})`;
        })
        .catch(error=>{
            console.log("An error occured!!!")
        })
    )
}

const blueRequest = document.getElementById('btn-blue');
blueRequest.addEventListener('click', function(){
    updateTheme('blue')
    blueRequest.classList.add('active');
})

const redRequest = document.getElementById('btn-red');
redRequest.addEventListener('click', function(){
    updateTheme('red');
    redRequest.classList.add('active');
})
const yellowRequest = document.getElementById('btn-yellow')
yellowRequest.addEventListener('click', function(){
    updateTheme('yellow')
    yellowRequest.classList.add('active');
})
const pinkRequest = document.getElementById('btn-pink');
pinkRequest.addEventListener('click', function(){
    updateTheme('pink')
    pinkRequest.classList.add('active');
})

const greenRequest = document.getElementById('btn-green')
greenRequest.addEventListener('click', function(){
    updateTheme('green')
    greenRequest.classList.add('active');
})

const darkTheme = document.getElementById('btn-dark')
darkTheme.addEventListener('click', function(){
    updateTheme('dark')
    darkTheme.classList.add('active');
})

