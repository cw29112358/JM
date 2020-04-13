import * as mesService from '../services/auth';
import { router } from 'umi';

export default {
  namespace: 'auth',
  state: {
    auth: {},
    loading: false,
  },
  reducers: {
    initAuth(state, { payload = {} }) {
      return { ...state, auth: payload };
    },
    startLoading(state) {
      return { ...state, loading: true };
    },
    endLoading(state) {
      return { ...state, loading: false };
    },
  },
  effects: {
    *getAuthInfo({ payload }, { call, put }) {
      const res = yield call(mesService.getAuthInfo);
      yield put({ type: 'initAuth', payload: res && res.auth });
    },
    *onLogin({ payload }, { call, put }) {
      yield put({ type: 'startLoading' });
      const res = yield call(mesService.onLogin, payload);
      if (res && res.token) {
        window.localStorage.setItem('authorization_token', res.token);
        router.push('/JM/home');
      }
      yield put({ type: 'endLoading' });
    },
  },
};
