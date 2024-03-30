/* Работа с категориями */

const mongodb = require('../mongo/mongodb');
const common = require('../common/common');

// Получение одной категории
async function getCategory(url) {
    const type = getType(url);

    if (type === 'all') {
        const result = {
            owner: null,
            size: null,
            season: null,
            location: null,
            type: null
        }

        for (const typeInArr in result) {
            result[typeInArr] = await getCategory('/' + typeInArr);
        }

        return result;

    } else {
        const result = await mongodb.find(type);

        return result.map(item => new Category(item));
    }
}

// Добавление значения в категорию
async function setCategory(req) {
    const type = getType(req.url);
    const name = req.body.name;

    await mongodb.insertOne(type, {
        id: common.generateId(),
        name
    });

    return await mongodb.find(type)//.map(item => new Category(item));
}

// Удаление значения из категории
async function removeCategory(req) {
    const type = getType(req.url);
    const id = req.body.id;

    await mongodb.deleteOne(type, {
        id
    });

    return await mongodb.find(type)//.map(item => new Category(item));
}

// Получение названия категории
function getType(url) {
    return url.substring(url.lastIndexOf('/') + 1);
}

// Класс категории
class Category {
    id = null;
    name = '';

    constructor(obj) {
        this.id = (obj && obj.id) ? obj.id : null;
        this.name = (obj && obj.name) ? obj.name : '';
    }
}

module.exports = {
    getCategory,
    setCategory,
    removeCategory
}