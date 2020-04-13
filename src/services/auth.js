import { request } from 'utils/request';

export function getAuthInfo() {
  return request({
    method: 'GET',
    url: '/api/auth',
  });
}

export function onLogin(data) {
  return request({
    method: 'POST',
    url: '/api/auth/login',
    data,
  });
}
