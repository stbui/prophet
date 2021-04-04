import React, {
    Children,
    useCallback,
    cloneElement,
    isValidElement,
    FunctionComponent,
} from 'react';
import {
    useRouteMatch,
    useLocation,
    useHistory,
    Route,
} from 'react-router-dom';
import { Tabs, TabsProps, TabPaneProps } from 'antd';

interface Props extends TabsProps {
    children: any;
    resource?: string;
    basePath?: string;
    Tab?: any;
    record?: any;
    tabPane?: TabPaneProps;
}

export const getTabFullPath = (tab, index, baseUrl) =>
    `${baseUrl}${
        tab.props.path ? `/${tab.props.path}` : index > 0 ? `/${index}` : ''
    }`;

/**
 *
 * @param param0
 *
 * @example
 *
 * import { ShowTabbed } from '@stbui/prophet';
 *
 * const Tab = ({ children }) => children;
 *
 * export default props => (
 *     <ShowTabbed {...props}>
 *         <Tab label="路由1" path="a">
 *             demo1
 *         </Tab>
 *         <Tab label="路由2" path="b">
 *             demo2
 *         </Tab>
 *         <Tab label="路由3" path="c">
 *             demo3
 *         </Tab>
 *         <Table label="Table" path="e">
 *             <Table.Column title="column"></Table.Column>
 *             <Table.Column title="column2"></Table.Column>
 *         </Table>
 *    </ShowTabbed>
 * );
 */
const ShowTabbedView: FunctionComponent<Props> = ({
    children,
    basePath,
    resource,
    record,
    tabPane,
    ...other
}) => {
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
                    {...tabPane}
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
