import { queryNotices } from '@/services/user';
import { getApps, getCurrentMenuData } from '@/services/app';
import { isResOk } from '@/utils/utils';
import { qiankunStart } from 'umi';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    apps: [],
    isLoadingApp: true,
  },
  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },

    // 获取所有跟应用的列表
    *getApps(_, { put, call }) {
      const res = yield call(getApps);
      if (!isResOk(res)) return;

      yield put({
        type: 'getAppsSuccess',
        payload: res.data
      });

      setTimeout(qiankunStart, 200);
    },

    // 获取当前应用的所有菜单
    *getCurrentMenuData({ callback, payload }, { put, call }) {
      const res = yield call(getCurrentMenuData, payload);
      if (!isResOk(res)) return;
      callback && callback(res);
    }
  },
  reducers: {
    getAppsSuccess(state, { payload }) {
      return {
        ...state,
        apps: payload,
        isLoadingApp: false,
      }
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
