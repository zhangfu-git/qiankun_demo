import {
  queryCurrent,
  queryColletMenu,
  queryAllMenu,
  queryHistoryMenu,
  collect,
  putSeen,
  searchMenu,
  changeOrderIndex,
  query as queryUsers
} from '@/services/user';
import { isResOk, getValueOnMetas } from '@/utils/utils';

const getApps = (data) => {
  let apps = [];
  data.forEach((item) => {
    const metas = item.metas;
    const name = getValueOnMetas(metas, 'name');
    const entry = getValueOnMetas(metas, 'entry');
    const base = getValueOnMetas(metas, 'base');
    const mountElementId = 'microSubApp';
    apps.push({
      name,
      entry,
      base,
      mountElementId,
    });
  });
}

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},  // 当前的用户信息
    collectMenu: [],  // 我的收藏菜单
    allMenu: [],      // 所有的菜单
    historyMenu: [],  // 历史访问菜单
    isLoadingCollectMenu: true,
    isLoadingHistoryMenu: true,
    isLoadingAllMenu: true,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (!isResOk(response)) return;
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    // 获取我的收藏菜单
    *fetchColletMenu(_, { call, put }) {
      const res = yield call(queryColletMenu);
      if (!isResOk(res)) return;
      const data = res.data;

      yield put({
        type: 'saveCollectMenu',
        payload: data.data
      });
    },

    // 获取最近我的使用菜单历史
    *fetchHistoryMenu(_, { call, put }) {
      const res = yield call(queryHistoryMenu);
      if (!isResOk(res)) return;
      yield put({
        type: 'saveHistoryMenu',
        payload: res.data.data
      });
    },

    // 获取所有的菜单
    *fetchAllMenu(_, { call, put }) {
      const res = yield call(queryAllMenu);
      if (!isResOk(res)) return;
      yield put({
        type: 'saveAllMenu',
        payload: res.data
      });
    },

    // 收藏菜单
    *putCollect({ callback, payload: { id, status } }, { call, put }) {
      const res = yield call(collect, id, status);
      if (!isResOk(res)) return;
      callback && callback();
    },

    // 记录历史预留菜单
    *putSeen({ callback, payload: { id, status }}, { call, put }) {
      const res = yield call(putSeen, id, status);
      if (!isResOk(res)) return;
      callback && callback(res);
    },

    // 搜索菜单
    *searchMenu({ callback, payload: { value } }, { call, put }) {
      const res = yield call(searchMenu, value);
      if (!isResOk(res)) return;
      yield put({
        type: 'saveAllMenu',
        payload: res.data
      });
    },

    // 更改我的收藏菜单排序
    *changeCollectOrderIndex({ callback, payload: { id, beforeId }}, { call }) {
      const res = yield call(changeOrderIndex, id, beforeId);
      if (!isResOk(res)) return;
      callback && callback();
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    // 保存我的收藏菜单
    saveCollectMenu(state, action) {
      return {
        ...state,
        collectMenu: action.payload,
        isLoadingCollectMenu: false,
      }
    },
    // 保存我最近返回的菜单历史
    saveHistoryMenu(state, action) {
      return {
        ...state,
        historyMenu: action.payload,
        isLoadingHistoryMenu: false,
      }
    },
    // 保存所有的菜单
    saveAllMenu(state, action) {
      return {
        ...state,
        allMenu: action.payload,
        isLoadingAllMenu: false,
      }
    },
  },
};
export default UserModel;
