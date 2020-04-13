import axios from 'axios';
import { notification, Icon } from 'antd';
import { router } from 'umi';

const request = axios.create({
  baseURL: '/',
  timeout: 9999,
  method: 'GET',
});

request.interceptors.request.use(
  async config => {
    config.headers.authorization = localStorage.getItem('authorization_token');
    return config;
  },
  error => Promise.reject(error),
);

request.interceptors.response.use(
  async response => {
    const data = response.data;
    // console.log('response--', response);
    if (data && data.status && data.status !== 200) {
      notification.error({
        message: '温馨提示',
        description: data.data.message,
        icon: (
          <Icon type="close-circle" theme="filled" style={{ color: '#CF1322', fontSize: '21px' }} />
        ),
        duration: 25,
        top: 58,
      });

      localStorage.removeItem('authorization_token');
      router.replace('/login');
      return;
    }
    return data && data.data;
  },
  error => Promise.reject(error),
);

export { request };
