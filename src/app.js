const path = require('path');
const express = require('express');
const hbs = require('hbs');
const routerApp = require('./routers/app-routes');


const app = express();

const pathToRessources = path.join(__dirname, '..', 'public');
const pathToViews = path.join(__dirname, '..', 'views');

app.set('views', pathToViews);
app.set('view engine', 'hbs');

app.use(express.static(pathToRessources));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routerApp);

const PORT = process.env.PORT || 3003;

app.listen(PORT, ()=>{
    console.log(`Server is listening on Port ${PORT}...`);
})