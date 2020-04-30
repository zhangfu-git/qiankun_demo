/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { useEffect } from 'react';
import { Link, Redirect } from 'umi';
import { connect } from 'dva';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button, Spin } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro, getAuthorityFromRouter, getValueOnMetas } from '@/utils/utils';
import logo from '../assets/logo.svg';
import NaseLayout from '@/components/NaseLayout';
import LeftContent from '@/components/GlobalHeader/LeftContent';
import defaultSettings from '../../config/defaultSettings';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
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

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    allMenu,
    apps,
    isLoadingApp,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      // 获取当前用户信息
      dispatch({
        type: 'user/fetchCurrent',
      });
      // 获取收藏菜单
      dispatch({
        type: 'user/fetchColletMenu'
      });
      // 获取我最新返回的菜单
      dispatch({
        type: 'user/fetchHistoryMenu'
      });
      // 获取所有的菜单
      dispatch({
        type: 'user/fetchAllMenu'
      });
      dispatch({
        type: 'global/getApps'
      });
    }
  }, []);

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  let isRenderSubApp = false;
  let currPathname = window.location.pathname.split('/')[1];

  // 检测路由的模式
  if (defaultSettings.history === 'hash') {
    currPathname = window.location.hash;
  }

  Array.isArray(allMenu) && allMenu.forEach((item) => {
    const metas = item.metas;
    const base = getValueOnMetas(metas, 'base');
    const appName = base && base.slice(1);
    if (currPathname.indexOf(appName) > -1) {
      isRenderSubApp = true;
    }
  });

  console.log('加载容器', props, isRenderSubApp, isLoadingApp, allMenu)

  return (
    <NaseLayout
      footerRender={footerRender}
      headerRightContentRender={() => <RightContent />}
      headerLeftContentRender={() => <LeftContent />}
      loading={isLoadingApp}
    >

      {!isRenderSubApp && !isLoadingApp
        ?
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
        :
        null
      }
      <div id="microSubApp" />
      {/* {!isLoadingApp && isRenderSubApp && apps.length ? <div id="microSubApp" />: null} */}
    </NaseLayout>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  allMenu: user.allMenu,
  apps: global.apps,
  isLoadingApp: global.isLoadingApp,
}))(BasicLayout);
