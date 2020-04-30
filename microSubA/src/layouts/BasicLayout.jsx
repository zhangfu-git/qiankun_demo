/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button, Spin, Layout, Menu } from 'antd';
import Authorized from '@/utils/Authorized';
import { isAntDesignPro, getAuthorityFromRouter, getValueOnMetas } from '@/utils/utils';
import DateTip from '@/components/DateTip';
import Icon from '@/components/Icon';

const { Sider, Content, Footer } = Layout;

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { 
      ...item, 
      // icon: item.icon && Icon({type: item.icon}), 
      children: item.children ? menuDataRender(item.children) : []
    };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright="2019 蚂蚁金服体验技术部出品"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    allMenu,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  let isRenderSubApp = false;
  let currPathname = location.pathname.split('/')[1];
  Array.isArray(allMenu) && allMenu.forEach((item) => {
    const metas = item.metas;
    const appName = getValueOnMetas(metas, 'appName');
    if (appName === currPathname) {
      isRenderSubApp = true;
    }
  });

  // const HeaderBlock = () => (<div>删除</div>)
  return (
    <ProLayout
      navTheme="light" 
      menuHeaderRender={false}
      menuDataRender={menuDataRender}
      onCollapse={handleMenuCollapse}
      {...props}
      {...settings}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      rightContentRender={() => (
        <DateTip />
      )}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}      
    >
      {/* <Authorized authority={authorized.authority} noMatch={noMatch}>
      </Authorized> */}
        {children}
    </ProLayout>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  allMenu: user.allMenu,
  apps: global.apps,
}))(BasicLayout);
