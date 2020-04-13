import { message } from 'antd';
import * as mesService from '../services/job';

export default {
  namespace: 'job',
  state: {
    jobs: {},
    loading: false,
    jobDetail: {},
  },
  reducers: {
    initJobs(state, { payload }) {
      return { ...state, jobs: payload, loading: false };
    },
    initJobDetail(state, { payload }) {
      return { ...state, jobDetail: payload, loading: false };
    },
    startLoading(state) {
      return { ...state, loading: true };
    },
    endLoading(state) {
      return { ...state, loading: false };
    },
  },
  effects: {
    *getJobs({ payload, callback }, { put, call }) {
      yield put({ type: 'startLoading' });
      const res = yield call(mesService.getJobs, payload);
      yield put({ type: 'initJobs', payload: res && res });
      if (callback) {
        callback(res);
      }
    },
    *createJob({ payload }, { call }) {
      const res = yield call(mesService.createJob, payload);
      message.success(res && res.message);
    },
    *getJobDetail({ payload }, { put, call }) {
      yield put({ type: 'startLoading' });
      const res = yield call(mesService.getJobDetail, payload);
      yield put({ type: 'initJobDetail', payload: res && res });
    },
    *deleteJob({ payload }, { put, call }) {
      yield put({ type: 'startLoading' });
      const res = yield call(mesService.deleteJob, payload);
      message.success(res && res.message);
      yield put({ type: 'endLoading' });
    },
  },
};
