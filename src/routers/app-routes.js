const express = require('express');

const router = express.Router();

router.get("^/$|^/board.html$", (req, res)=>[
    res.redirect('/board')
]);


router.get("^/board$" , (req, res)=>{
    res.render('index')
});

function getRandomIndex(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

router.get("/mood-request", (req, res)=>{
    const req_query = req.query;

    const blueBgPath = ['/images/blue-bg/blue1.jpg','/images/blue-bg/blue2.jpg','/images/blue-bg/blue3.jpg'];
    const redBgPath = ['/images/red-bg/red1.jpg', '/images/red-bg/red2.jpg', '/images/red-bg/red3.jpg'];
    const yellowBgPath = ['/images/yellow-bg/yellow1.jpg', '/images/yellow-bg/yellow2.jpg', '/images/yellow-bg/yellow3.jpg'];
    const pinkBgPath = ['/images/pink-bg/pink1.jpg', '/images/pink-bg/pink2.jpg', '/images/pink-bg/pink3.jpg'];
    const greenBgPath = ['/images/green-bg/green1.jpg', '/images/green-bg/green2.jpg', '/images/green-bg/green3.jpg'];
    const dkBgPath = ['/images/dark-bg/black1.jpg', '/images/dark-bg/black2.jpg', '/images/dark-bg/black3.jpg'];
    
    let index = getRandomIndex(0, 2);
    let pathImage = ''
    if(req_query.mood == 'red'){
        pathImage = redBgPath[index];
    }
    if(req_query.mood == 'green'){
        pathImage = greenBgPath[index];
    }
    if(req_query.mood == 'blue'){
        pathImage = blueBgPath[index];
    }
    if(req_query.mood == 'pink'){
        pathImage = pinkBgPath[index];
    }
    if(req_query.mood == 'yellow'){
        pathImage = yellowBgPath[index];
    }
    if(req_query.mood == 'dark'){
        pathImage = dkBgPath[index];
    }

    return res.send({path: pathImage});
    
});

module.exports = router;