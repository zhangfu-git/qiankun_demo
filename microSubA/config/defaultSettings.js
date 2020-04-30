const isDev = process.env.NODE_ENV === 'development';
const appPrefix = 'microSubA';

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
  title: 'DEMO系统',
  pwa: false,
  iconfontUrl: '',
  SYSTEM_NAME: 'DEMO系统', // 系统的名称
  APP_LOGO: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', // 定义全局可用
  defaultFooter: {
    links: [
    ],
    copyright: 'DEMO系统'
  },
  /* ################ 自定义默认配置 ################ */
  publicPath: `/org/${appPrefix}/`, // 资源的前缀, 多机构需要配置这个
  base: `/${appPrefix}`, // 微前端需要配置
  history: 'hash', // 前端路由的方式 browser、hash、memory
  requestPrefix: '', // 请求api的前缀
  mountElementId: `${appPrefix}`,
};
