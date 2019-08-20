import fetch from 'cross-fetch';
import config from '../config';
import GemiaAPI from './gemiaAPI';
import Entity from './entity';

class Photo extends Entity {
    async uploadPhoto(photo) {
        this.storeEntity = 'upload';
        const data = new FormData();
        data.append('image', photo);
        const result = await this.upload(data);
        return result.id;
    }

    async getResult(id) {
        this.storeEntity = 'result';
        const result = await this.fetch({}, id);
        return result;
    }
    async getStatus(id) {
        this.storeEntity = 'getStatus';
        const result = await this.fetch({}, id);
        return result;
    }
}

export default new Photo(fetch, GemiaAPI, config);
