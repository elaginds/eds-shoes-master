/* Класс карточки */

export class Shoes {
    id = null;
    photo = null;
    ownerId = null;
    ownerName = '';
    size = null;
    outdoor = true;
    season = null;
    casual = true;
    location = null;
    favorites = false;
    trash = false;
    type = null;
    description = '';
    filled = false;

    constructor(obj) {
        this.id = (obj && obj.id) ? obj.id : null;
        this.photo = (obj && obj.photo) ? obj.photo : null;
        this.ownerId = (obj && obj.ownerId) ? obj.ownerId : null;
        this.ownerName = (obj && obj.ownerName) ? obj.ownerName : '';
        this.size = (obj && obj.size) ? obj.size : null;
        this.outdoor = this.getBoolean(obj, 'outdoor', true);
        this.season = (obj && obj.season) ? obj.season : null;
        this.casual = this.getBoolean(obj, 'casual', true);
        this.location = (obj && obj.location) ? obj.location : null;
        this.favorites = this.getBoolean(obj, 'favorites', false);
        this.trash = this.getBoolean(obj, 'trash', false);
        this.type = (obj && obj.type) ? obj.type : null;
        this.description = (obj && obj.description) ? obj.description : '';
        this.filled = this.getBoolean(obj, 'filled', false);

    }

    getBoolean(obj, name, defaultValue) {
        if (!obj) {
            return false;
        }

        if (obj[name]) {
            return true;
        } else {
            if (obj[name] === false) {
                return false;
            } else {
                return defaultValue;
            }
        }
    }
}