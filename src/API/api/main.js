import { CMX } from './cmx';
import { Presence } from './presence';
import { SITE_ID } from '../config';

export default new class Api {

    cmx = new CMX();

    presence = new Presence();

    get siteId () {
        return (SITE_ID);
    }

}();
