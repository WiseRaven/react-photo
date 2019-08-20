import cookie from 'react-cookies';

class JWTToken {
    constructor() {
        this.token = this.getTokenFromCookie();
    }

    getTokenFromCookie() {
        if (process.env.NODE_ENV === 'development' || window.userId) {
            return '13hdh32hbejhbxjciu3eh484723uv';
        }
        else {
            const token = cookie.load('JWT');
            if (token) {
                return token;
            }
            else {
                return null;
            }
        }

    }

    getToken() {
        return this.token;
    }
}

export default new JWTToken(cookie);
