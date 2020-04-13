import { message } from 'antd';
import * as mesService from '../services/talent';

export default {
  namespace: 'talent',
  state: {
    talentList: {},
    loading: false,
  },
  reducers: {
    initTalentList(state, { payload }) {
      return { ...state, talentList: payload, loading: false };
    },
    getTalentContactList(state) {
      return { ...state, loading: true };
    },
  },
  effects: {
    *getTalentPool({ payload, callback }, { put, call }) {
      const res = yield call(mesService.getTalentPool, payload);
      yield put({ type: 'initTalentList', payload: res && res });
      if (callback) {
        callback(res);
      }
    },
    *createTalent({ payload }, { call }) {
      const res = yield call(mesService.createTalent, payload);
      message.success(res ? res.message : '创建成功');
    },
    *toggleFavorite({ payload }, { call }) {
      const res = yield call(mesService.toggleFavorite, payload);
      message.success(res && res.message);
    },
    *getTalentContactList({ payload, callback }, { put, call }) {
      const res = yield call(mesService.getTalentContactList, payload);
      yield put({ type: 'initTalentList', payload: res && res });
      if (callback) {
        callback(res);
      }
    },
  },
};
