import { isResOk } from '@/utils/utils';
import { fetchCountList, fetchLogList } from '@/services/dashboard';

const Dashboard = {
  namespace: 'dashboard',
  state: {
    logList: [],
    countList: []
  },
  effects: {
    // 获取面板日志
    *fetchLogList({ payload, callback }, { call, put }) {
      const res = yield call(fetchLogList, payload);
      if (!isResOk(res)) return;
      yield put({
        type: 'saveLogList',
        payload: res.data
      });
      callback && callback();
    },
    // 获取面板数据列表
    *fetchCountList({ payload }, { call, put }) {
      const res = yield call(fetchCountList, payload);
      if (!isResOk(res)) return;
      yield put({
        type: 'saveCountList',
        payload: res.data
      });
    },
  },
  reducers: {
    saveLogList(state, { payload }) {
      return {
        ...state,
        logList: payload,
      }
    },
    saveCountList(state, { payload }) {
      return {
        ...state,
        countList: payload
      }
    }
  }
};

export default Dashboard;