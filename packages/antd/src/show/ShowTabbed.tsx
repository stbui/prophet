import React, {
    Children,
    useCallback,
    isValidElement,
    FunctionComponent,
} from 'react';
import { useParams, useLocation, useNavigate, Route } from 'react-router-dom';
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
    const match = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const url = match ? match.url : location.pathname;

    const onTabChange = useCallback(path => navigate(path), [history]);

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
            {childrenArray.map((Tab: any, index) => (
                <Tabs.TabPane
                    key={getTabFullPath(Tab, index, url)}
                    tab={Tab.props.label}
                    forceRender={Tab.props.forceRender}
                    {...tabPane}
                >
                    1
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
};

export const ShowTabbed = props => <ShowTabbedView {...props} />;
