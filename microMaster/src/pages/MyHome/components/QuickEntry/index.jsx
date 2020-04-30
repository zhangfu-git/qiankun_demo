import React from 'react';
import Card from '@/components/Card';
import { Col, Row } from 'antd';
import EntryLink from '../EntryLink';
import { connect } from 'dva';

const QuickEntry = (props) => {
  const { data=[], loading } = props;
  console.log('快捷入口:', data);
  return (
    <Card
      loading={loading}
      title="快捷功能"
      showEmptyContent={!data.length}
      emptryDescription="可在所有功能列表, 添加快捷功能"
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
  data: user.collectMenu,
  loading: user.isLoadingCollectMenu,
}))(QuickEntry);