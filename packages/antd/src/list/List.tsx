import React, { Component, cloneElement, Children } from 'react';
import { ListController } from '@coat/core';

export interface IProps {
  children?: React.ReactNode;
}

export class ListView extends Component<IProps> {
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

export const List: React.SFC<IProps> = (props: IProps) => (
  <ListController {...props}>
    {controllerProps => <ListView {...props} {...controllerProps} />}
  </ListController>
);

export default List;
