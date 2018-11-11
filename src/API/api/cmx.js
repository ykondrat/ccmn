import { MAIN_URL_CMX, USER, PASSWORD_CMX, ERROR_STRING } from '../config';

export class CMX {

    async get (url, type) {
        const auth = new Buffer(`${USER}:${PASSWORD_CMX}`).toString('base64');
        const response = await fetch(`${MAIN_URL_CMX}${url}`, {
            method: 'GET',
            responseType: `${type}`,
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
