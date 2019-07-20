import React, { cloneElement } from 'react';
import { ListController } from 'prophet-core';
import { Tabs, Card } from 'antd';

export interface IProps {
    children: any;
    setFilters: any;
    setPage: any;
    className: string;
    type: any;
    addContent: any;
    panes: any[];
    bordered: boolean;
    loading: boolean;
}

const { TabPane } = Tabs;

export const ListView = ({
    panes = [],
    addContent,
    type,
    children,
    className,
    setFilters,
    setPage,
    bordered,
    loading,
    ...other
}: IProps) => (
    <Card bordered={false} loading={loading} bodyStyle={{ padding: 0 }}>
        <Tabs
            className={className}
            type={type}
            size="large"
            onChange={tab => {
                setFilters({ tab });
            }}
            {...other}
        >
            {panes.map(pane => (
                <TabPane tab={pane.title} key={pane.key}>
                    {pane.content
                        ? cloneElement(pane.content, {
                              setFilters,
                              setPage,
                              ...other,
                          })
                        : children({ ...pane, setFilters, setPage, ...other })}
                </TabPane>
            ))}

            {addContent && (
                <TabPane tab={<div className="icon-add">+</div>} key="add">
                    {addContent}
                </TabPane>
            )}
        </Tabs>
    </Card>
);

export const ListTabbed: React.SFC<IProps> = (props: IProps) => (
    <ListController {...props}>
        {controllerProps => <ListView {...props} {...controllerProps} />}
    </ListController>
);

export default ListTabbed;
