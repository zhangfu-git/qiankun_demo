import React from 'react';
import { Row, Col, Typography } from 'antd';
import styles from './index.less';
import dayjs from 'dayjs';
const { Paragraph } = Typography;

export default class LogTipBlock extends React.PureComponent {
  render() {
    const { createdAt, log, type } = this.props;
    const createdAtFormat = createdAt ? dayjs(createdAt).format('YYYY年MM月DD日 HH:mm'): '';
    return (
      <Row
        justify="start"
        align="bottom"
      >
        <Col
          className={styles.content}
        >
          {/* <div
            className={styles.name}
          >
            陈敏
          </div> */}
          <div
            className={styles.log}
          >
            {log}
          </div>
          <div
            className={styles.createdAt}
          >
            {createdAtFormat}
          </div>
        </Col>
        <Col
          className={styles.tipCount}
        >
          <Paragraph
            ellipsis
            style={{margin: 0, fontSize: '12px'}}
          >
            已通知了3人
          </Paragraph>
        </Col>
      </Row>
    )
  }
}