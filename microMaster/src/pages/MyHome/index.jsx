import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Row, Col } from 'antd';
import styles from './index.less';
import CommonlyUsed from './components/CommonlyUsed';
import QuickEntry from './components/QuickEntry';
import AllEntry from './components/AllEntry';
import DashboardLog from './components/DashboardLog';
import DashboardCountList from './components/DashboardCountList';
import WorkbenchTip from '@/components/WorkbenchTip';

const MyHome = (props) => {
  return (
    <div
      className={styles.pageWrapper}
    >
      <Row
        gutter={20}
      >
        <Col
          xs={{span: 24}}
          lg={{span: 16}}     
        >
          <WorkbenchTip />
          <DashboardCountList />
          <CommonlyUsed />
          <QuickEntry />
          <div id="anchor_allEnptyId">
            <AllEntry />
          </div>
        </Col>
        <Col
          xs={{span: 24}}
          lg={{span: 8}}      
        >
          <DashboardLog />
        </Col>
      </Row>
    </div>
  );
}


export default MyHome;