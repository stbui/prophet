import jsonServerProvider from 'prophet-data-json-server';
const dataProvider = jsonServerProvider('http://localhost:996');

export default dataProvider;
