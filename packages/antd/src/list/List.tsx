import React, { Component, cloneElement, Children } from 'react';

export interface PropsType {
  children?: any;
}

export class List extends Component<PropsType> {
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

export default List;
