const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
   }
   window.addEventListener('resize', documentHeight)
   documentHeight()

const isLogged = ()=>{
    const vStored = localStorage.getItem('session');
    console.log(vStored)
    if(vStored === null) { return false;}
    else{ return true;}
}

const openAccess = document.getElementById('profile');
const form = document.getElementById('access');
const closeAccess = document.getElementsByClassName('close-access');
const [userSection] = document.getElementsByClassName('user-icon');

// document.addEventListener('DOMContentLoaded', function(event){
//     // console.log(isLogged());
//     const status = {logged: isLogged()};
//     fetch('/board', {
//         method: 'POST',
//         headers: {'Content-Type' : 'application/json'},
//         body: JSON.stringify(status)
//     })
//     console.log('Request Send to the server.')
// });

openAccess.addEventListener('click', ()=>{
    form.style.display = 'flex';
})

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
    document.getElementById('sec4').classList.replace(active.value, color)
    active.classList.remove('active');

    fetch(`/mood-request?mood=${color}`).then(
        response => response.json()
        .then(data=>{
            Object.assign(document.body.style, {
                background: `url(${data.path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            })
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
redRequest.addEventListener('click', function(){ updateTheme('red');
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

const messageOutput = document.getElementById('message');

const formRegister = document.querySelector('#registering');
formRegister.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(formRegister);
    const data = new URLSearchParams(formData);

    fetch('/board/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: data
    })
    .then(response=> {return response.json()})
    .then(message=>{
        if(message.error){
            messageOutput.innerHTML = 'This user already exists.';
            Object.assign(messageOutput.parentElement.style, {
                display: 'block',
                transition: 'all 0.5s',
                backgroundColor: '#ba5e5e',
            })  
            return 
        }
        messageOutput.innerHTML = message.success;
            Object.assign(messageOutput.parentElement.style, {
                display: 'block',
                transition: 'all 0.5s',
                backgroundColor: '#5eba7d'
            });
        console.log(message);
    })
    .catch(error=>{
        console.log('There were an error '+ error);
    })
})

const formLogin = document.querySelector('#logging-in');
formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(formLogin);
    const data = new URLSearchParams(formData);
    fetch('/board/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: data
    })
    .then(response=> {return response.json()})
    .then(message=>{
        if(message.error){
            messageOutput.innerHTML = message.error;
            Object.assign(messageOutput.parentElement.style, {
                display: 'block',
                backgroundColor: 'red',
            })  
            return 
        }
        messageOutput.innerHTML = message.ok;
        Object.assign(messageOutput.parentElement.style, {
            display: 'block',
            backgroundColor: 'green'
        });
        localStorage.setItem('session', 'enabled');
        // location.reload();
    })
    .catch(error=>{
        console.log('There were an error '+ error);
    })
})

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
