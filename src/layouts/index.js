import React, { PureComponent } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { router } from 'umi';
import { connect } from 'dva';
import zhCN from 'antd/es/locale/zh_CN';

import Sider from 'components/layouts/sider';
import Header from 'components/layouts/header';
import { getAuthInfoAction } from 'actions/layouts';
import styles from './index.less';

const { Content } = Layout;

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    const { getAuthInfo } = this.props;
    if (!window.localStorage.getItem('authorization_token')) {
      router.replace('/login');
    } else {
      getAuthInfo();
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { auth } = this.props;
    const { collapsed } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <Layout className={styles.layout}>
          <Sider collapsed={collapsed} />
          <Layout>
            <Header collapsed={collapsed} toggle={this.toggle} auth={auth} />
            <Content
              style={{
                margin: 10,
                background: '#fff',
                minWidth: 900,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default connect(
  ({ auth }) => ({
    auth: auth.auth,
  }),
  dispatch => ({
    getAuthInfo: () => dispatch(getAuthInfoAction()),
  }),
)(BasicLayout);
