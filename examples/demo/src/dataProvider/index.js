import jsonServerProvider from 'prophet-data-json-server';
const dataProvider = jsonServerProvider('http://127.0.0.1:3000');

export default dataProvider;
