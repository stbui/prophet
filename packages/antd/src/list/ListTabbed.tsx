import React, {
    Children,
    useCallback,
    cloneElement,
    isValidElement,
} from 'react';
import {
    useRouteMatch,
    useLocation,
    useHistory,
    Route,
} from 'react-router-dom';
import { Tabs, Card } from 'antd';

import { useListController } from '@stbui/prophet-core';
import ListActions from './ListActions';

/**
import { ListTabbed } from '@stbui/prophet-antd'

export default props => (
    <ListTabbed {...props}>
        <ListTabbed.Tab label="路由1" path="a" actions={} >
            <Table>
                <Table.Column title="column"></Table.Column>
                <Table.Column title="column2"></Table.Column>
            </Table>
        </ListTabbed.Tab>
        <ListTabbed.Tab label="路由2" path="b">
            <Table>
                <Table.Column title="column"></Table.Column>
                <Table.Column title="column2"></Table.Column>
            </Table>
        </ListTabbed.Tab>
        <ListTabbed.Tab label="路由3" path="c">
            <Table>
                <Table.Column title="column"></Table.Column>
                <Table.Column title="column2"></Table.Column>
            </Table>
        </ListTabbed.Tab>
    </ListTabbed>
);
 */

const Tab = ({ children, basePath, resource, location, actions, ...other }) => {
    const controller = useListController({
        basePath,
        resource,
        location,
        ...other,
    });

    return (
        <Card bordered={false}>
            {actions && cloneElement(actions, { ...controller })}
            {children &&
                cloneElement(Children.only(children), { ...controller })}
        </Card>
    );
};

Tab.defaultProps = {
    actions: <ListActions />,
};

export const getTabFullPath = (tab, index, baseUrl) =>
    `${baseUrl}${
        tab.props.path ? `/${tab.props.path}` : index > 0 ? `/${index}` : ''
    }`;

const ListTabbed = ({ children, basePath, resource, ...other }) => {
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const url = match ? match.url : location.pathname;

    const onTabChange = useCallback(path => history.push(path), [history]);

    if (!children) {
        return <div>缺失子组件 &lt;Tab&gt;</div>;
    }

    const childrenArray = Children.toArray(children);

    const validTabPaths = childrenArray.map((tab, index) =>
        getTabFullPath(tab, index, url)
    );

    const tabValue = validTabPaths.includes(location.pathname)
        ? location.pathname
        : validTabPaths[0];

    return (
        <Tabs defaultActiveKey={tabValue} onChange={onTabChange} {...other}>
            {childrenArray.map((tab: any, index) => (
                <Tabs.TabPane
                    key={getTabFullPath(tab, index, url)}
                    tab={tab.props.label}
                    forceRender={tab.props.forceRender}
                >
                    <Route exact path={getTabFullPath(tab, index, url)}>
                        {props =>
                            isValidElement(tab)
                                ? cloneElement(tab, {
                                      basePath,
                                      resource,
                                      ...other,
                                  } as any)
                                : null
                        }
                    </Route>
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
};

ListTabbed.Tab = Tab;

export default ListTabbed;
