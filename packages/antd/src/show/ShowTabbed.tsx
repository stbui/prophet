import React, {
    Children,
    useCallback,
    cloneElement,
    isValidElement,
} from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Tabs } from 'antd';

// const Tab = () => <div></div>;

// const ShowTabbed = props => (
//     <ShowTabbedView>
//         <Tab path="route1" label="label-route1">
//             123
//         </Tab>
//         <Tab path="route2" label="label-route2">
//             345
//         </Tab>
//     </ShowTabbedView>
// );

export const getTabFullPath = (tab, index, baseUrl) =>
    `${baseUrl}${
        tab.props.path ? `/${tab.props.path}` : index > 0 ? `/${index}` : ''
    }`;

const ShowTabbedView = ({ children, basePath, resource, record }) => {
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
        <Tabs defaultActiveKey={tabValue} onChange={onTabChange}>
            {Children.map(children, (tab, index) => (
                <Tabs.TabPane
                    key={getTabFullPath(tab, index, url)}
                    tab={tab.props.label}
                >
                    <Route exact path={getTabFullPath(tab, index, url)}>
                        {props =>
                            isValidElement(tab)
                                ? React.cloneElement(tab, {
                                      basePath,
                                      resource,
                                      record,
                                      hidden: !props.match,
                                  } as any)
                                : null
                        }
                    </Route>
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
};

const ShowTabbed = props => <ShowTabbedView {...props} />;

export default ShowTabbed;
