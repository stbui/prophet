import React from 'react';
import { Button, Result } from 'antd';

let defaultData = {
    404: {
        text: '抱歉，你访问的页面不存在',
    },
    403: {
        text: '抱歉，你无权访问该页面',
    },
    500: {
        text: '抱歉，服务器出错了',
    },
};

const CatchAll = ({ auth, data }) => {
    return (
        <Result
            status={auth}
            title={auth}
            subTitle={data[auth].text}
            extra={<Button type="primary">返回首页</Button>}
        />
    );
};

CatchAll.defaultProps = {
    auth: 404,
    data: defaultData,
};

export default CatchAll;
