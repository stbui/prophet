import React from 'react';

const Services = ({ data }) => (
    <div className="section-container space">
        <div className="fix-width text-center">
            <div className="features-intro">
                <h2>这些团队正在使用</h2>
                <p>目前企业团队开发者超过了1个。</p>
            </div>
            <div
                style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexFlow: 'row  wrap',
                }}
            >
                <div
                    style={{
                        flex: '1 1 25%',
                        boxSizing: 'border-box',
                        maxWidth: '25%',
                        paddingRight: 50,
                        paddingLeft: 50,
                    }}
                >
                    <div className="feature-list">
                        <div className="snapshot" style={{ width: 200, height: 50 }}></div>
                    </div>
                </div>
                <div
                    style={{
                        flex: '1 1 25%',
                        boxSizing: 'border-box',
                        maxWidth: '25%',
                        paddingRight: 50,
                        paddingLeft: 50,
                    }}
                >
                    <div className="feature-list">
                        <div className="snapshot" style={{ width: 200, height: 50 }}></div>
                    </div>
                </div>
                <div
                    style={{
                        flex: '1 1 25%',
                        boxSizing: 'border-box',
                        maxWidth: '25%',
                        paddingRight: 50,
                        paddingLeft: 50,
                    }}
                >
                    <div className="feature-list">
                        <div className="snapshot" style={{ width: 200, height: 50 }}></div>
                    </div>
                </div>
                <div
                    style={{
                        flex: '1 1 25%',
                        boxSizing: 'border-box',
                        maxWidth: '25%',
                        paddingRight: 50,
                        paddingLeft: 50,
                    }}
                >
                    <div className="feature-list">
                        <div className="snapshot" style={{ width: 200, height: 50 }}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Services;
