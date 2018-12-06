export const GET_LIST = 'GET_LIST';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export interface ICrud {
  GET_LIST?: string;
  CREATE?: string;
  UPDATE?: string;
  DELETE?: string;
}
