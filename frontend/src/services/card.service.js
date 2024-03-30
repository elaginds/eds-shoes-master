/* Работа с карточками */

import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api/cards/' : 'http://localhost:8282/api/cards/';

class CardsService {

    // Получение всех карточек
    getCards() {
        return axios.get(API_URL);
    }

    // Обновление одной карточки
    updateCard(card) {
        return axios.post(API_URL, {card})
    }
}

export default new CardsService();