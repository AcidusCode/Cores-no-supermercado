import {json} from '../_lib/http.js';

export const onRequestGet = () => json(200, {storage: 'sqlite'});
