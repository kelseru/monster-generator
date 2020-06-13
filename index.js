// tools & dependencies
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

// API
const getMonsters = require('./lib/getMonsters');

const app = express();

// settings for content in public folder (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// settings for express-handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

//settings for content in views folder (our pages)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// localhost responses
app.get ('/', async(req, res) => {
    let data = await getMonsters('https://www.dnd5eapi.co/api/monsters');
    // console.log(data.results[3].url);
    // fs.writeFileSync('monsterData.json', JSON.stringify(data));
    // console.log('https://www.dnd5eapi.co'+data.results[0].url)
    let data2 = await getMonsters('https://www.dnd5eapi.co'+data.results[3].url)
    // fs.writeFileSync('monsterData2.json', JSON.stringify(data2)); 
    // ^make a note on how to use this in the readme
    // console.log(data2);
    res.render('index');
});

app.get('/monsters', (req, res) => {
    res.render('monsters');
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(3002, () => {
    console.log('listening on port 3002 http://localhost:3002/');
});