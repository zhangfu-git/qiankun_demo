import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <PageHeaderWrapper content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <p>
            
      </p>
      <Button
        onClick={() => {
          console.log('当前window', window.microMaster.parentHistory)
          window.microMaster.parentHistory.push('/microSubA/emptypage')
        }}
      >
            跳转到应用A=> 空白页面_A
      </Button>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};
