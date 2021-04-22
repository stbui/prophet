import React, { useContext, useState, useEffect } from 'react';
import { context, Link } from 'dumi/theme';
import Layout from 'dumi-theme-default/src/layout';

import Hero from './Hero';
import Features from './Features';
import Services from './Services';

const Magi: React.FC<any> = ({ children, location, ...props }) => {
    const {
        base,
        config: { mode, repository },
        meta,
        locale,
        nav: navItems,
    } = useContext(context);

    if (meta.hero) {
        return (
            <>
                <Hero hero={meta.hero} navItems={navItems} title={meta.title} base={base}></Hero>
                {meta.features ? <Features features={meta.features} /> : null}
                {meta.services ? <Services data={meta.services} /> : null}

                {/* <section className="bg-color-primary space position-relative">
                    <div
                        className="background-holder background-holder--contain"
                        style={{
                            backgroundImage:
                                'url(https://zainfo.oss-cn-shanghai.aliyuncs.com/magi/bg-pattern/cta-bg.png)',
                        }}
                    ></div>
                    <div className="fix-width position-relative">
                        <div
                            style={{
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexFlow: 'row  wrap',
                            }}
                        >
                            <div
                                style={{
                                    paddingRight: 50,
                                    paddingLeft: 50,
                                    flex: '1 1 50%',
                                    boxSizing: 'border-box',
                                    maxWidth: '50%',
                                }}
                            >
                                <h3 className="m-b-20">快速创建项目</h3>
                                <p>通过一行命令，快速初始化项目</p>
                            </div>
                            <div
                                style={{
                                    paddingRight: 50,
                                    paddingLeft: 50,
                                    flex: '1 1 50%',
                                    boxSizing: 'border-box',
                                    maxWidth: '50%',
                                }}
                            >
                                <div className="snapshot"></div>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* <div className="section-container space">
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
                </div> */}

                {/* <div _ngcontent-c25="" className="fix-width">
                    {children}
                </div> */}
                {/* <div className="section-container space">
                    <div className="fix-width text-center">
                        <div className="features-intro">
                            <h2>反馈与共建</h2>
                            <p>加入讨论群：</p>
                        </div>

                        <div
                            style={{
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexFlow: 'row  wrap',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <h3>交流讨论咨询</h3>
                                <img src="" width="390" />
                            </div>

                            <div>
                                <h3>铜牌开发者咨询</h3>
                                <iframe
                                    src=""
                                    width="390"
                                    height="560"
                                    scrolling="no"
                                    style={{ border: 0 }}
                                ></iframe>
                            </div>

                            <div>
                                <h3>金牌开发者咨询</h3>
                                <iframe
                                    src=""
                                    width="390"
                                    height="560"
                                    scrolling="no"
                                    style={{ border: 0 }}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div> */}

                <footer className="footer">
                    <div className="fix-width">
                        <div className="footer-copyright">
                            <span>Copyright 2013-2021. All Rights Reserved by stbui Pro</span>
                            <span></span>
                            <span>
                                Design & Developed by &nbsp;
                                <a href="https://github.com/stbui" target="blank">
                                    stbui
                                </a>
                            </span>
                        </div>
                    </div>
                </footer>
            </>
        );
    }

    return (
        <Layout location={location} {...props}>
            {children}
        </Layout>
    );
};

export default Magi;
