import React, { memo, useEffect } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';

import { onLoginAction } from 'actions/feature';

const LoginForm = memo(function(props) {
  const { form, onLogin, loading } = props;
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onLogin(values);
      }
    });
  };

  const validatePassword = (rule, value, callback) => {
    if (value && value.length < 6) {
      callback('密码长度不能小于6位');
    } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/.test(value)) {
      callback('密码必须由字母和数字组合');
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('authorization_token')) {
      router.replace('/JM/home');
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [
            {
              required: true,
              message: '用户名必填',
            },
          ],
        })(
          <Input
            placeholder="用户名: admin"
            prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '密码必填',
            },
            {
              validator: validatePassword,
            },
          ],
        })(
          <Input.Password
            placeholder="密码: admin123"
            prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" block loading={loading}>
          登 录
        </Button>
      </Form.Item>
    </Form>
  );
});

const Login = Form.create({ name: 'login' })(LoginForm);

export default connect(
  ({ auth }) => ({
    loading: auth.loading,
  }),
  dispatch => ({
    onLogin: values => dispatch(onLoginAction(values)),
  }),
)(Login);
