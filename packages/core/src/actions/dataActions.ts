export const CRUD_GET_LIST = 'CRUD_GET_LIST';

export const crudGetList = resource => ({
  type: CRUD_GET_LIST,
  payload: {},
  mate: {
    resource,
    fetch: 'GET_LIST'
  }
});
