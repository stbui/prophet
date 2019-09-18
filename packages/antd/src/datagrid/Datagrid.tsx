import React, { Children } from 'react';
import { Table } from 'antd';

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
    } = props;

    const handlePageChange = (current, pageSize) => setPage(current);

    const handleShowSizeChange = (current, pageSize) => setPerPage(pageSize);

    const handleShowTotal = () =>
        `共 ${total} 条记录 第 ${page}/${Math.ceil(total / perPage)} 页`;

    const columns: any = [];

    Children.map(children, (child, key) => {
        const { children, dataIndex, ...other } = child.props;
        columns.push({
            title: children || dataIndex,
            dataIndex,
            key,
            ...other,
        });
    });

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
        />
    );
};

Datagrid.defaultProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: false,
    data: [],
    page: 1,
};

export default Datagrid;
