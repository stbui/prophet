import React, { Component, cloneElement, Children } from 'react';
import { ListController } from '@admin/core';

export interface PropsType {
  children?: any;
}

export class ListView extends Component<PropsType> {
  render() {
    const { children, ...other } = this.props;
    
    return Children.map(children, (child: any) => {
      if (child.type instanceof Function) {
        return cloneElement(child, { ...other });
      } else if (child.type instanceof Object) {
        return cloneElement(child);
      } else {
        return child;
      }
    });
  }
}

export const List = props => (
  <ListController {...props}>
    {controllerProps => <ListView {...props} {...controllerProps} />}
  </ListController>
);

export default List;
