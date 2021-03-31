import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import './index.scss';

const { TabPane } = Tabs;

const T = ({ panes, addContent, type, children, className, ...other }) => (
  <Tabs className={className} type={type} {...other}>
    {panes.map(pane => (
      <TabPane tab={pane.title} key={pane.key}>
        {pane.content ? pane.content : children(pane)}
      </TabPane>
    ))}

    {addContent && (
      <TabPane tab={<div className="icon-add">+</div>} key="add">
        {addContent}
      </TabPane>
    )}
  </Tabs>
);

T.propTypes = {
  // panes: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

T.defaultProps = {
  type: 'card',
  className: 'dynamic-tabs',
};

export default T;
