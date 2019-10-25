import React, {
    Children,
    useCallback,
    cloneElement,
    isValidElement,
} from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Tabs } from 'antd';

/**
const Tab = ({ children }) => children;

const ShowTabbed = () => (
    <ShowTabbed>
        <Tab label="路由1" path="a">
            demo1
        </Tab>
        <Tab label="路由2" path="b">
            demo2
        </Tab>
        <Tab label="路由3" path="c">
            demo3
        </Tab>
        <Table label="Table" path="e">
            <Table.Column title="column"></Table.Column>
        </Table>
    </ShowTabbed>
);
 */

export const getTabFullPath = (tab, index, baseUrl) =>
    `${baseUrl}${
        tab.props.path ? `/${tab.props.path}` : index > 0 ? `/${index}` : ''
    }`;

const ShowTabbedView = ({ children, basePath, resource, record, ...other }) => {
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
            {childrenArray.map((tab, index) => (
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
                                      record,
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
