export const CRUD_CHANGE_LIST_PARAMS = 'CRUD_CHANGE_LIST_PARAMS';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTERS = 'SET_FILTERS';

export const changeListParams = (resource: string, params: any) => ({
  type: CRUD_CHANGE_LIST_PARAMS,
  payload: params,
  meta: { resource }
});

export const setPageParams = (page: number) => ({
  type: SET_PAGE,
  payload: page
});

export const setFiltersParams = (filters: any) => ({
  type: SET_FILTERS,
  payload: filters
});
