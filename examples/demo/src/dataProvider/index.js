import jsonServerProvider from 'prophet-data-json-server';
const dataProvider = jsonServerProvider('http://localhost:3000');

export default dataProvider;
