const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");

require('dotenv').config();

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8282;

const cards = require('./src/cards');
const categories = require('./src/categories');
const images = require('./src/images');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({}));

// Получение всех категорий
app.get('/api/categories/*', function (req, res) {
    categories.getCategory(req.url).then(result => {
        res.status(200).type('text/plain');
        res.send(result);
    });
});

// Получение всех карточек
app.get('/api/cards/', function (req, res) {
    cards.getCards().then(result => {
        res.status(200).type('text/plain');
        res.send(result);
    });
});

// Добавление значения в категорию
app.post('/api/categories/*', function (req, res) {
    console.log('YES');
    categories.setCategory(req).then(result => {
        res.status(200).type('text/plain');
        res.send(result);
    });
});

// Добавление картинок
app.post('/api/image/', function (req, res) {
    images.addImages(req).then(result => {
        res.status(200).type('text/plain');
        res.send(result);
    });
});

// Изменение одной карточки
app.post('/api/cards/', function (req, res) {
    cards.updateCard(req).then(result => {
        res.status(200).type('text/plain');
        res.send(result);
    });
});

// Удаление значения из категории
app.delete('/api/categories/*', function (req, res) {
    categories.removeCategory(req).then(result => {
        res.status(200).type('text/plain');
        res.send(result);
    });
});


app.listen(port, host, function () {
    console.log(`Server listens ${host}:${port}`);
});