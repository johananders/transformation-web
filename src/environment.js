const env = process.env.NODE_ENV;

const apiVersion = 'v1';

let backendHost = env === 'production' ? 'https://reverse-service.herokuapp.com' : 'http://localhost:8080';

const API_ROOT = backendHost + '/transformations/' + apiVersion;

module.exports = API_ROOT