import { MAIN_URL_PRESENCE, USER, PASSWORD_PRESENCE, ERROR_STRING } from '../config';

export class Presence {

    async get (url) {
        const auth = new Buffer(`${USER}:${PASSWORD_PRESENCE}`).toString('base64');
        const response = await fetch(`${MAIN_URL_PRESENCE}${url}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Basic ${auth}`
            }
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(ERROR_STRING);
        }

        return (data);

    }

}
