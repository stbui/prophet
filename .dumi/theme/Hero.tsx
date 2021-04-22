import React from 'react';
import { context, Link, NavLink } from 'dumi/theme';
import './hero.less';
const pkg = require('../../lerna.json');

const Product = () => {
    return (
        <div>
            <div _ngcontent-c25="" className="fix-width"></div>
        </div>
    );
};

const Magi: React.FC<any> = ({
    children,
    location,
    hero,
    navItems,
    base,
    title,
    ...props
}) => {
    return (
        <>
            <div
                _ngcontent-c25=""
                className="section-container"
                style={{
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    display: 'flex',
                }}
            >
                <div
                    _ngcontent-c25=""
                    className="shape shape-style-1 shape-primary"
                >
                    <span _ngcontent-c25="" className="circle-150"></span>
                    <span _ngcontent-c25="" className="circle-50"></span>
                    <span _ngcontent-c25="" className="circle-50"></span>
                    <span _ngcontent-c25="" className="circle-75"></span>
                    <span _ngcontent-c25="" className="circle-100"></span>
                    <span _ngcontent-c25="" className="circle-75"></span>
                    <span _ngcontent-c25="" className="circle-50"></span>
                    <span _ngcontent-c25="" className="circle-100"></span>
                    <span _ngcontent-c25="" className="circle-50"></span>
                    <span _ngcontent-c25="" className="circle-100"></span>
                </div>
                <div _ngcontent-c25="" className="fix-width">
                    <div
                        _ngcontent-c25=""
                        style={{
                            flexDirection: 'row',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            height: 64,
                        }}
                    >
                        <div _ngcontent-c25="" className="home-logo">
                            <Link _ngcontent-c25="" to={base}>
                                {title}
                            </Link>
                        </div>
                        <span
                            _ngcontent-c25=""
                            style={{ flex: '1 1 0', boxSizing: 'border-box' }}
                        ></span>

                        <ul _ngcontent-c25="" className="nav">
                            {navItems.map(nav => {
                                const child = Boolean(nav.children?.length) && (
                                    <ul>
                                        {nav.children.map(item => (
                                            <li key={item.path}>
                                                <NavLink
                                                    _ngcontent-c25=""
                                                    to={item.path}
                                                >
                                                    {item.title}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                );

                                return (
                                    <li
                                        _ngcontent-c25=""
                                        key={nav.title || nav.path}
                                    >
                                        {nav.path ? (
                                            <NavLink
                                                _ngcontent-c25=""
                                                to={nav.path}
                                                key={nav.path}
                                            >
                                                {nav.title}
                                            </NavLink>
                                        ) : (
                                            nav.title
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div
                        _ngcontent-c25=""
                        className="content"
                        style={{
                            flexDirection: 'column',
                            boxSizing: 'border-box',
                            display: 'flex',
                            maxWidth: '100%',
                            placeContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <h1 _ngcontent-c25="" className="text-white">
                            {hero.title}
                        </h1>
                        <h5
                            _ngcontent-c25=""
                            dangerouslySetInnerHTML={{ __html: hero.desc }}
                        ></h5>
                        <h4 _ngcontent-c25="">
                            {hero.actions &&
                                hero.actions.map(action => {
                                    if (action.link) {
                                        return (
                                            <Link to={action.link}>
                                                <span className="button primary lg">
                                                    {action.text}
                                                </span>
                                            </Link>
                                        );
                                    }

                                    return (
                                        <span className="button primary lg">
                                            {action.text}
                                        </span>
                                    );
                                })}
                        </h4>
                        <h5 _ngcontent-c25="" style={{ color: '#fff' }}>
                            当前版本：{pkg.version} 企业版
                        </h5>
                    </div>
                </div>
                <div className="bbb"></div>

                <div
                    className="hero__shape"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 1920 242.6">
                        <path
                            fill="#fff"
                            d="M1920,70.5v172.1H0v-27.9C171.3,122.8,367.9,89,589.6,113.4C923.1,149.9,1014.7,43,1239.7,7  c224.9-35.9,442.2,77.7,576.1,75.6C1853.2,82,1888,78,1920,70.5z"
                        ></path>
                        <rect
                            x="-1036"
                            y="-829.4"
                            width="1920"
                            height="137.6"
                        ></rect>
                        <rect
                            x="-1136"
                            y="-829.4"
                            width="2446"
                            height="380"
                        ></rect>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default Magi;
