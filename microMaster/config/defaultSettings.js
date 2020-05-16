export default {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'DEMO',
  pwa: false,
  iconfontUrl: '',
  SYSTEM_NAME: 'DEMO',
  APP_LOGO: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', // 定义全局可用
  defaultFooter: {
    links: [
    ],
    copyright: 'DEMO'
  },  
  /* ################ 自定义默认配置 ################ */
  publicPath: '/org/microMaster/',  // 资源的前缀
  base: '/', // 前端路由的前缀
  history: {
    type: 'browser'
  }, // 前端路由的方式 browser、hash、memory
  requestPrefix: '',
  orgId: 14,      // 当前机构下的id
};