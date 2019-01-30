import jsonServerProvider from 'prophet-data-json-server';
const dataProvider = jsonServerProvider('http://localhost:3001');

export default dataProvider;
