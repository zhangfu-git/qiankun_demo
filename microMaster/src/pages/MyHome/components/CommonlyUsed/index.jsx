import React from 'react';
import Card from '@/components/Card';
import { Col, Row } from 'antd';
import EntryLink from '../EntryLink';
import { connect } from 'dva';

const CommonlyUsed = (props) => {
  const { data=[], loading } = props;
  return (
    <Card
      loading={loading}
      title="常用功能"
      showEmptyContent={!data.length}
      emptryDescription="您还未使用过"
    >
      <Row
        gutter={20}
      >
        {
          Array.isArray(data) && data.map((item) => {
            return (
              <EntryLink
                key={item.id}
                {...item}
              />   
            )
          })
        }
      </Row>
    </Card>
  )
}

export default connect(({ user }) => ({
  data: user.historyMenu,
  loading: user.isLoadingHistoryMenu,
}))(CommonlyUsed);