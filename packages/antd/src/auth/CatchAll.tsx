import React from 'react';
import { Button } from 'antd';

let defaultData = {
    404: {
        text: '抱歉，你访问的页面不存在',
        img:
            'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
    },
    403: {
        text: '抱歉，你无权访问该页面',
        img:
            'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
    },
    500: {
        text: '抱歉，服务器出错了',
        img:
            'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
    },
};

const CatchAll = ({ auth, data }) => {
    return (
        <div className="exception">
            <div className="exception-imgBlock">
                <div
                    className="exception-imgEle"
                    style={{
                        backgroundImage: 'url("' + data[auth].img + '")',
                    }}
                />
            </div>
            <div className="exception-content">
                <h1>{auth}</h1>
                <div className="exception-desc">{data[auth].text}</div>
                <div className="exception-actions">
                    <a href="/">
                        <Button type="primary">返回首页</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

CatchAll.defaultProps = {
    auth: 404,
    data: defaultData,
};

export default CatchAll;
