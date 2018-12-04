import axios from 'axios';

const instance = axios.create();
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';
export default instance;