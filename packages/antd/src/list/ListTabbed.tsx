import React, { Component, cloneElement } from 'react';
import { ListController } from 'prophet-core';
import { Tabs } from 'antd';

export interface IProps {
  children: any;
  changeParams: any;
  className: any;
  type: any;
  addContent: any;
  panes: any;
}

const { TabPane } = Tabs;

export const ListView = ({
  panes,
  addContent,
  type,
  children,
  className,
  changeParams,
  ...other
}: IProps) => (
  <Tabs
    className={className}
    type={type}
    onChange={tab => changeParams({ tab })}
    {...other}
  >
    {panes.map(pane => (
      <TabPane tab={pane.title} key={pane.key}>
        {pane.content
          ? cloneElement(pane.content, { changeParams, ...other })
          : children({ ...pane, changeParams, ...other })}
      </TabPane>
    ))}

    {addContent && (
      <TabPane tab={<div className="icon-add">+</div>} key="add">
        {addContent}
      </TabPane>
    )}
  </Tabs>
);

export const ListTabbed: React.SFC<IProps> = (props: IProps) => (
  <ListController {...props}>
    {controllerProps => <ListView {...props} {...controllerProps} />}
  </ListController>
);

export default ListTabbed;
