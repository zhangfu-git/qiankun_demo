import { Button, Result } from 'antd';
import React from 'react';
import { router } from 'umi';

const NoPermissionDenied = () => (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you don't have access to this page"
    extra={
      <Button type="primary" onClick={() => {
        if (typeof window.microMaster.logout === 'function') {
          window.microMaster.logout();
        } else {
          router.replace({
            pathname: '/'
          });
        }
        // router.push('/')
      }}>
        Back Home
      </Button>
    }
  />
);

export default NoPermissionDenied;
