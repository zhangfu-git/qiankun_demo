import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { PrintDownloadCard } from 'nasetech-ui';
import { Table } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <PageHeaderWrapper 
      className={styles.main}
    >
      <PrintDownloadCard
        title="资产管理"
      >
        <PrintDownloadCard.Content>
          <Table
            dataSource={[
              {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
              },
              {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
              },
            ]}
            columns={[
              {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
              },
            ]}
          >
          </Table>
        </PrintDownloadCard.Content>
      </PrintDownloadCard>
    </PageHeaderWrapper>
  );
};
