import React from 'react';
import { context, Link, NavLink } from 'dumi/theme';

const Feture = () => {
    return (
        <div className="m-30">
            <div _ngcontent-c25="" className="fix-width">
                <h2 _ngcontent-c25="" className="text-center">
                    功能 &amp; 特点
                </h2>
                <div
                    _ngcontent-c25=""
                    style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexFlow: 'row  wrap',
                    }}
                ></div>
            </div>
        </div>
    );
};

const Features = ({ features }) => (
    <div className="features">
        <div _ngcontent-c25="" className="fix-width">
            <div className="features-intro text-center">
                <h2>一站式体系化解决方案</h2>
                <p>一款完整配套技术栈，助力开发专注于业务开发</p>
            </div>

            <div
                _ngcontent-c25=""
                style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexFlow: 'row  wrap',
                }}
            >
                {features.map(feat => (
                    <div
                        _ngcontent-c25=""
                        style={{
                            flex: '1 1 33%',
                            boxSizing: 'border-box',
                            maxWidth: '33%',
                        }}
                    >
                        <div className="feature-list">
                            <div className="card-icon">
                                <img src={feat.icon} width="80" />
                            </div>
                            <div className="card-text">
                                <h3 className="text-center">{feat.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: feat.desc }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Features;
