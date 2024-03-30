/* Работа с карточками */

const mongodb = require('../mongo/mongodb');
const common = require('../common/common');

// Создание карточки
async function createCard(fileName) {
    const card = new Card(fileName);

    const result = await mongodb.insertOne('cards', card);

    return !!(result && result.insertedId);
}

// Получение всех карточек
async function getCards() {
    const cards = await mongodb.find('cards', {});

    return cards.map(item => {
        delete item._id;

        item.filled = getFilled(item);

        return item;
    });
}

// Изменение одной карточки
async function updateCard(req) {
    const card = req.body.card;

    const result = await mongodb.findOneAndUpdate('cards', {id: card.id}, card);

    result.filled = getFilled(result);

    delete result._id;

    return result;
}

// Добавление параметра FILLED - заполнена карточка или нет
function getFilled(card) {
    return !!(card.ownerId && card.size && card.season && card.location);
}

// Класс карточки
class Card {
    id = null;
    photo = null;
    ownerId = null;
    ownerName = '';
    size = null;
    outdoor = true;
    season = [];
    casual = true;
    location = null;
    favorites = false;
    trash = false;
    type = null;
    description = '';
    filled = false;

    constructor(fileName) {
        this.id = common.generateId();
        this.photo = fileName;
    }
}

module.exports = {
    createCard,
    getCards,
    updateCard
}