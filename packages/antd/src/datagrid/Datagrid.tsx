import React, { Children } from 'react';
import { Table } from 'antd';
import { EditButton, ShowButton, DeleteButton } from '../button';
/**
 * <Datagrid>
 *  <Column dataIndex="name">姓名</Column>
 *  <Column dataIndex="age">年龄</Column>
 * </Datagrid>
 */

export const Datagrid = props => {
    const {
        children = [],
        data,
        ids,
        page,
        perPage,
        total,
        setPage,
        setPerPage,
        showSizeChanger,
        showQuickJumper,
        hideOnSinglePage,
        noData,
        hasCreate,
        hasEdit,
        hasShow,
        defaultOpera,
    } = props;

    const handlePageChange = (current, pageSize) => setPage(current);

    const handleShowSizeChange = (current, pageSize) => setPerPage(pageSize);

    const handleShowTotal = () =>
        `共 ${total} 条记录 第 ${page}/${Math.ceil(total / perPage)} 页`;

    const columns: any = [];

    Children.map(children, (child, key) => {
        const { children, dataIndex, isOpera, ...other } = child.props;

        columns.push({
            title: children || dataIndex,
            dataIndex,
            key,
            ...other,
        });
    });

    if (defaultOpera) {
        if (hasCreate === false && hasEdit === false && hasShow === false) {
            // console.log(hasCreate, hasEdit, hasShow);
        } else {
            columns.push({
                title: '操作',
                width: 180,
                render: record => (
                    <React.Fragment>
                        {hasEdit ? (
                            <EditButton
                                id={record.id}
                                basePath={props.basePath}
                            />
                        ) : null}
                        <span style={{ marginRight: 12 }}></span>
                        {hasShow ? (
                            <ShowButton
                                id={record.id}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                        ) : null}
                        <span style={{ marginRight: 12 }}></span>
                        {hasCreate ? (
                            <DeleteButton
                                id={record.id}
                                record={record}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                        ) : null}
                    </React.Fragment>
                ),
            });
        }
    }

    const pagination = {
        showSizeChanger,
        showQuickJumper,
        hideOnSinglePage,
        total,
        current: page,
        defaultPageSize: perPage,
        showTotal: handleShowTotal,
        onShowSizeChange: handleShowSizeChange,
        onChange: handlePageChange,
    };

    const newData = Array.isArray(data) ? data : ids && ids.map(d => data[d]);

    if (noData && (!newData || !newData.length)) {
        return noData;
    }

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={newData}
            pagination={pagination}
            {...props}
        ></Table>
    );
};

Datagrid.defaultProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
    data: [],
    page: 1,
    defaultOpera: true,
};

export default Datagrid;
