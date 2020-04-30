import React from 'react';
import styles from './index.less';
import Item from './Item';
import { Row, Col } from 'antd';

export default class List extends React.Component {
  render() {
    const { data=[] } = this.props;
    return (
      <Row
        gutter={60}
      >
        {
          data.map((item) => {
            return (
              <Col
                span={12}
                key={item.id}
              >
                <Item
                  data={item}
                />
              </Col>
            )
          })
        }
      </Row>
    )
  }
}