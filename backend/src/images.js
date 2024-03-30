/* Работа с картинками */

const cards = require('./cards');
const common = require('../common/common');

// Добавление картинок
async function addImages(req) {
    let files = req.files.images;
    const errors = [];
    const done = [];

    if (!files.map) {
        files = [files];
    }

    for (const file of files) {
        const result = await addImage(file);

        if (result === 'done') {
            done.push(result);
        } else {
            errors.push(result);
        }
    }

    return {
        done: done.length,
        error: errors.length
    }

}

// Добавление одной картинки
async function addImage(file) {
    console.log(file);

    const extensionArr = file.name.split('.');
    // const extension = extensionArr[extensionArr.length - 1];
    const extension = getFileExtention(file);
    const serverPatch = (process.env.NODE_ENV === 'prod') ? '/var/www/edssm/public/images/' : 'I:/Projects/eds-shoes-master/backend/public/images/';
    // const serverPatch = '/var/www/edssm/public/images/';
    file.name = common.generateId() + '.' + extension;



    let error = await file.mv(`${serverPatch}${file.name}`);

    if (!error) {
        const createdCard = await cards.createCard(file.name);

        if (!createdCard) {
            error = true;
        }
    }

    return error ? error : 'done';
    // return 'done';
}

// Получение расширения файла
function getFileExtention(file) {
    const mimetype = file.mimetype;

    if (mimetype.indexOf('jpeg')) {
        return 'jpeg'
    } else if (mimetype.indexOf('jpg')) {
        return 'jpg'
    } else if (mimetype.indexOf('png')) {
        return 'png'
    } else {
        return 'jpg'
    }

}

module.exports = {
    addImages
}