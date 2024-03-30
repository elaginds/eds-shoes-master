/* Работа с изображениями */

import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api/image/' : 'http://localhost:8282/api/image/';

class ImageService {

    // Загрузить несколько изображений
    uploadImages(fd) {
        return axios.post(API_URL, fd);
    }
}

export default new ImageService();