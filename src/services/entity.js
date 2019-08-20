class Entity {
    constructor(fetch, GemiaAPI, config) {
        const { urlAPI } = config;
        this.api = new GemiaAPI(fetch, urlAPI);
    }
    async fetch(query = {}, subLink = '') {
        if (this.storeEntity) {
            return await this.api.get(this.storeEntity, query, subLink);
        }
    }
    async search(query = {}) {
        if (this.storeEntity) {
            return await this.api.search(this.storeEntity, query);
        }
    }
    async post(data = {}) {
        if (this.storeEntity) {
            return await this.api.post(this.storeEntity, data);
        }
    }
    async upload(data = {}) {
        if (this.storeEntity) {
            return await this.api.upload(this.storeEntity, data);
        }
    }
    async delete(data = {}) {
        if (this.storeEntity) {
            return await this.api.delete(this.storeEntity, data);
        }
    }
}

export default Entity;
