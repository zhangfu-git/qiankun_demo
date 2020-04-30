import React, { useEffect } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import Card from '@/components/Card';
import { Row, Col } from 'antd';
import Panel from './Panel';
import { connect } from 'dva';

const DashboardCountList = (props) => {
  const { hasBottomGutter=true, data=[], dispatch } = props;
  useEffect(() => {
    // dispatch({
    //   type: 'dashboard/fetchCountList'
    // });
  }, []);
  return (
    <Row
      gutter={20}
      className={classnames({
        [styles.hasBottomGutter20]: hasBottomGutter && data.length
      })}
    >
      {
        data.map((item) => {
          return (
            <Col
              key={item.id}
              xs={{span: 24}}
              md={{span: 12}}
              lg={{span: 8}}
            >
              <Card
                hoverable
              >
                <Panel {...item} />
              </Card>
            </Col>
          )
        })
      }
    </Row>
  );
}

export default connect(({ dashboard }) => ({
  data: dashboard.countList,
}))(DashboardCountList);