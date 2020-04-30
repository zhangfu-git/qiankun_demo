import request from '@/utils/request';
import { getValueOnMetas } from '@/utils/utils';
import { fetch } from 'dva';
import { stringify } from 'qs';
import { router } from 'umi';
import defaultSettings from '../config/defaultSettings.js';

const query = stringify({
  filter: JSON.stringify({
    categories: ['应用'],
    cateIsAlias: "true",
    status: ['close']
  }),
  metas: JSON.stringify(['name', 'entry', 'base', 'mountElementId', 'entry_dev'])
});

export const qiankun = request(`/api/v0/post/list?${query}`).then((res) => {

  console.log('########### 容器注册 #########', res);
  let apps = [];
  if (res && res.code === 0) {
    if (res.data.length) {
      res.data.forEach((item) => {
        const metas = item.metas;
        const name = getValueOnMetas(metas, 'name');
        const entry = getValueOnMetas(metas, 'entry');
        const base = getValueOnMetas(metas, 'base');
        const entryDev = getValueOnMetas(metas, 'entry_dev');
        const mountElementId = 'microSubApp';
        const _entry = REACT_APP_ENV === 'dev' ? entryDev : entry;
        // const history = getValueOnMetas(metas, 'history');
        apps.push({
          name,
          entry: _entry,
          base,
          mountElementId,
        });
      });
    }
  }

  apps.map((item) => {
    item.props = {
      logout: (event) => {
        // 不要使用window.g_app_store进行全局调用, 如果主应用和子应用都存在相同的model，会导致死循环
        
        if (defaultSettings.history === 'hash'
            ? 
            window.location.hash.indexOf('#/login') === -1
            :
            window.location.pathname !== '/login'
        ) {
          router.replace({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      },
      parentHistory: router
    }
    return item;
  });

  return {
    apps: apps,
    jsSandbox: true, // 是否启用 js 沙箱，默认为 false
    prefetch: true, // 是否启用 prefetch 特性，默认为 true
    singular: true,
    lifeCycles: {
      // see https://github.com/umijs/qiankun#registermicroapps
      afterMount: props => {
        console.log(props);
      },
    },
    fetch: url => {
      console.log('静态资源fetch覆盖', url);
      return fetch(url);
    }
  }
});