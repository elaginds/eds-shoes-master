class Category {
    id = null;
    name = '';

    constructor(obj) {
        this.id = (obj && obj.id) ? obj.id : null;
        this.name = (obj && obj.name) ? obj.name : '';
    }
}