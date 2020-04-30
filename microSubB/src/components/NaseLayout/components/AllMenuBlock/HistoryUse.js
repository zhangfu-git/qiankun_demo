import React from 'react';
import { Row, Col } from 'antd';
import Item from './Item';

export default class HistoryUse extends React.PureComponent {
  onClickLink(data) {
    typeof this.props.onClickLink === 'function' && this.props.onClickLink(data);
  }
  render() {
    const { data=[] } = this.props;
    return (
      <div>
        <div>最近使用</div>
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
                    onClick={this.onClickLink.bind(this)}
                    data={item}
                  />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}