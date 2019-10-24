import React, { Children, useCallback } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Tabs } from 'antd';

export const getTabFullPath = (tab, index, baseUrl) =>
    `${baseUrl}${
        tab.props.path ? `/${tab.props.path}` : index > 0 ? `/${index}` : ''
    }`;

const ShowTabbedView = ({ children }) => {
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const url = match ? match.url : location.pathname;

    const onTabChange = useCallback(key => history.push(key), [history]);

    const validTabPaths = Children.toArray(children).map((tab, index) =>
        getTabFullPath(tab, index, url)
    );

    const tabValue = validTabPaths.includes(location.pathname)
        ? location.pathname
        : validTabPaths[0];

    return (
        <div>
            <Tabs defaultActiveKey={tabValue} onChange={onTabChange}>
                {Children.toArray(children).map((tab, index) => (
                    <Tabs.TabPane
                        key={url + '/' + tab.props.path}
                        tab={tab.props.label}
                    >
                        <Route exact path={url + '/' + tab.props.path}>
                            {() => tab.props.children}
                        </Route>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    );
};

const Tab = () => <div></div>;

const ShowTabbed = props => (
    <ShowTabbedView>
        <Tab path="route1" label="label-route1">
            123
        </Tab>
        <Tab path="route2" label="label-route2">
            345
        </Tab>
    </ShowTabbedView>
);

export default ShowTabbed;
