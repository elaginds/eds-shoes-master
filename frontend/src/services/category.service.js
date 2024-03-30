/* Работа с категориями */

import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api/categories/' : 'http://localhost:8282/api/categories/';

class CategoryService {

    // Получение значений одной или всех категорий
    getCategories(type) {
        if (type) {
            return axios.get(API_URL + type);
        } else {
            return axios.get(API_URL + 'all');
        }
    }

    // Добавление значений в категорию
    setCategory(type, name) {
        return axios.post(API_URL + type, {
            name
        });
    }

    // Удаление значения из категории
    removeCategory(type, id) {
        return axios.delete(API_URL + type, {
            data: {
                id
            },
        });
    }
}

export default new CategoryService();