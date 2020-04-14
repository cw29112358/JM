import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar, Upload, message } from 'antd';
import { router } from 'umi';

import styles from './index.less';

const { Header } = Layout;

function onSetting({ key }) {
  if (key === '/login') {
    localStorage.removeItem('Authorization');
    router.replace(key);
  } else {
    router.push(key);
  }
}

const settingMenu = (
  <Menu onClick={onSetting}>
    <Menu.Item key="/JM/personalCenter">
      <Icon type="user" />
      <span className={styles.setting_menu_item}>个人中心</span>
    </Menu.Item>
    <Menu.Item key="/JM/personalSetting">
      <Icon type="setting" />
      <span className={styles.setting_menu_item}>个人设置</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="/login">
      <Icon type="logout" />
      <span className={styles.setting_menu_item}>退出登录</span>
    </Menu.Item>
  </Menu>
);

const languageMenu = (
  <Menu>
    <Menu.Item>
      CN
      <span className={styles.setting_menu_item}>简体中文</span>
    </Menu.Item>
    {/* <Menu.Item>
      US
      <span className={styles.setting_menu_item}>English</span>
    </Menu.Item> */}
  </Menu>
);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class Head extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: undefined,
    };
  }

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传jpeg或者png格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({ imageUrl });
      });
    }
  };

  render() {
    const { collapsed = false, toggle, auth } = this.props;
    const { imageUrl } = this.state;
    return (
      <Header style={{ background: '#fff', padding: 0, height: 50, lineHeight: '50px' }}>
        <div className={styles.flex}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <div className={styles.right}>
            <Upload
              name="avatar"
              showUploadList={false}
              action="/api/profiles/upload"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              headers={{
                Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
              }}
            >
              {imageUrl ? (
                <Avatar src={imageUrl} size={30} />
              ) : auth.avatar && auth.avatar.uri ? (
                <Avatar src={auth.avatar.uri} size={30} />
              ) : (
                <Avatar size={30} icon="user" />
              )}
            </Upload>
            <Dropdown overlay={settingMenu}>
              <span className={styles.user}>{auth.userName || 'JM'}</span>
            </Dropdown>
            <Dropdown overlay={languageMenu}>
              <div className={styles.global}>
                <Icon type="global" style={{ fontSize: 16 }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    );
  }
}
