import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import slash from 'slash2';

// import themePluginConfig from './themePluginConfig';
const {
  pwa,
  publicPath,
  base,
  history
} = defaultSettings;
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const { winPath } = utils;

export default defineConfig({
  // 通过 package.json 自动挂载 umi 插件，不需再次挂载
  // plugins: [],
  publicPath,
  base,
  history,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
  },
  dynamicImport: {
    // 无需 level, webpackChunkName 配置
    // loadingComponent: './components/PageLoading/index'
    loading: '@/components/PageLoading/index',
  },
  // 暂时关闭
  pwa: false,
  lessLoader: { javascriptEnabled: true },
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (context, _, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = slash(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      }
    }
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    APP_LOGO: defaultSettings.APP_LOGO, // 全局可访问的logo.svg
    SYSTEM_NAME: defaultSettings.SYSTEM_NAME // 全局可访问的系统名称
  },
  routes: [{
      path: '/login',
      component: '../layouts/UserLayout',
      routes: [{
          path: '/login',
          name: 'login',
          component: './user/login',
        },
        {
          component: './404',
        }
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [{
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [{
              path: '/',
              redirect: '/center',
            },
            {
              name: 'center',
              path: '/center',
              icon: 'smile',
              component: './MyHome',
            },
            {
              name: 'settings',
              path: '/settings',
              icon: 'settings',
              component: './Settings'
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
})