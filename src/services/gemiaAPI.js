import JWTToken from './JWTToken';

class GemiaAPI {
    constructor(fetch, urlAPI) {
        this.fetch = fetch;
        this.urlAPI = urlAPI;
        this.token = JWTToken;
    }

    getUrlAPI(key, queryURI = '') {
        return (this.urlAPI[key] ? this.urlAPI[key] : '/') + (queryURI.toString() ? `?${queryURI}` : '');
    }
    async search(entity, query) {
        const queryURI = this.makeURIParams(query);
        return this.fetch(this.getUrlAPI(entity, queryURI)).then(async response => {
            try {
                const data = await response.text();
                const dataJSON = JSON.parse(data);
                return dataJSON;
            } catch (error) {
                return null;
            }
        }).then(data => ({
            'data': this.dataMiddleware(data),
            'meta': data.meta,
            'links': data.links
        }));
    }
    async post(entity, data) {
        return this.fetch(this.getUrlAPI(entity), {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(async response => {
                return this.dataMiddleware(response);
            }).catch(error => {
                console.log('=====>', error)
                return false;
            });
    }
    async upload(entity, data) {
        const httpHeaders = {
            'Authorization': `Bearer ${this.token.getToken()}`
        };
        return this.fetch(this.getUrlAPI(entity), {
            method: 'POST',
            headers: httpHeaders,
            body: data
        }).then(response => response.json())
            .then(async response => { 
                return this.dataMiddleware(response);
            }).catch(error => {
                console.log('=====>', error)
                return false;
            });
    }
    async delete(entity, data) {
        return this.fetch(this.getUrlAPI(entity), {
            method: 'delete',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(async response => {
                return response;
            }).catch(error => console.log(error));
    }
    async get(entity, query, subLink) {
        const queryURI = this.makeURIParams(query);
        const httpHeaders = {
            'Authorization': `Bearer ${this.token.getToken()}`
        };
        return this.fetch(this.getUrlAPI(entity, queryURI) + subLink, {
            headers: httpHeaders,
        }).then(async response => {
            try {
                const data = await response.text();
                return JSON.parse(data);
            } catch (error) {
                console.error(error);
                return null;
            }
        }).then(data => {
            return this.dataMiddleware(data);
        });
    }
    async set(entity, data) {
        console.log(entity, data);
    }
    makeURIParams(query) {
        const data = Object.entries(query);
        return data.reduce((acc, el) => {
            acc.push(el.join('='));
            return acc;
        }, []).join('&');
    }
    dataMiddleware(JSONData) {
        if (!JSONData) {
            return null;
        }
        else {
            return JSONData;
        }
    }
}

export default GemiaAPI;
