import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { Timeline } from 'antd';
import LogTipBlock from './LogTipBlock';
import { connect } from 'dva';

const DashboardLog = (props) => {
  const { data, dispatch } = props;
  const [loading, setLoading] = useState(true);
  let interval = 0;
  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchLogList',
      callback: () => {
        setLoading(false);
      }
    });
    interval = window.setInterval(() => {
      dispatch({
        type: 'dashboard/fetchLogList'
      });
    }, 5000);
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  }, []);  
  return (
    <Card
      title="日志看板"
      loading={loading}
      showEmptyContent={!data.length}
      emptryDescription="暂无日志"
    >
      <Timeline>
        {
          data.map((item, index) => {
            const isLatest = index === data.length - 1;
            return (
              <Timeline.Item
                key={item.id}
                color={isLatest ? '#ffc107' : 'blue'}
              >
                <LogTipBlock {...item} />
              </Timeline.Item>
            )
          })
        }
      </Timeline>        
    </Card>
  );
}

export default connect(({ dashboard }) => ({
  data: dashboard.logList,
}))(DashboardLog);