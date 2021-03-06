import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, isResOk } from '@/utils/utils';
import defaultSettings from '../../config/defaultSettings';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(fakeAccountLogin, payload);
      if (!isResOk(res)) return;
      const data = res.data;

      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority: 'admin'
        },
      }); // Login successfully
      
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }

      history.replace(redirect || '/center');
    },

    *logout({ payload }, { call }) {
      const res = yield call(logout);
      if (!isResOk(res)) return;
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (defaultSettings.history === 'hash' 
        ? 
        window.location.hash.indexOf('#/login') === -1 && !redirect
        : window.location.pathname !== '/login' && !redirect
      ) {
        history.replace({
          pathname: '/login',
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // currentAuthority ant分admin和user
      setAuthority(payload.currentAuthority);
      // 
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
