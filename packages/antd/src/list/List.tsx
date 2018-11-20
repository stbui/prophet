import React, { Component, cloneElement, Children } from 'react';
import { ListController } from 'prophet-core';
import ListActions from './ListActions';
import { Button } from 'antd';

export interface IProps {
  children?: React.ComponentType;
  actions?: React.ComponentType;
}

export const ListView = ({ children, actions = <ListActions />, ...other }) => {
  // Children.map(children, (child: any) => {
  //   if (child.type instanceof Function) {
  //     return cloneElement(child, { ...other });
  //   } else if (child.type instanceof Object) {
  //     return cloneElement(child);
  //   } else {
  //     return child;
  //   }
  // });

  return (
    <div>
      {cloneElement(actions, { ...other })}
      <Button icon="plus" type="primary">新建</Button>
      {children && cloneElement(children, { ...other })}
    </div>
  );
};

export const List: React.SFC<IProps> = (props: IProps) => (
  <ListController {...props}>
    {controllerProps => <ListView {...props} {...controllerProps} />}
  </ListController>
);

export default List;
