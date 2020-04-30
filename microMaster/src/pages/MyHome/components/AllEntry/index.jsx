import React from 'react';
import Card from '@/components/Card';
import { Col, Row, Input } from 'antd';
import EntryLink from '../EntryLink';
import { connect } from 'dva';
import debounce from 'lodash/debounce';

const { Search } = Input;

const AllEntry = (props) => {
  const { data, loading, dispatch } = props;

  const onSearch = (e) => {
    dispatch({
      type: 'user/searchMenu',
      payload: {
        value: e
      }
    });
  }
  return (
    <Card
      loading={loading}
      title="所有功能"
      showEmptyContent={!data.length}
      emptryDescription="敬请期待"
      extra={
        <Search size="lager" 
          onSearch={onSearch}
          onInput={(e) => {
            const target = e.currentTarget;
            const value = target.value;
            onSearch(value)
          }}
        />
      }
    >
      <Row
        gutter={20}
      >
        {
          data.map((item) => {
            return (
              <EntryLink
                isCanCollect={true}
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
  data: user.allMenu,
  loading: user.isLoadingAllMenu,
}))(AllEntry);