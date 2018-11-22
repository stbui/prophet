import React, { cloneElement } from 'react';
import { ListController } from 'prophet-core';
import ListActions from './ListActions';

export interface IProps {
  children?: React.ComponentType;
  actions?: React.ComponentType;
  changeParams?: any;
}

export const ListView = ({ children, actions = <ListActions />, ...other }) => {
  return children && cloneElement(children, { ...other });
};

export const List: React.SFC<IProps> = (props: IProps) => (
  <ListController {...props}>
    {controllerProps => <ListView {...props} {...controllerProps} />}
  </ListController>
);

export default List;
