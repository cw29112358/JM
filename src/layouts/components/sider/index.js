import React, { PureComponent } from 'react';
import { router } from 'umi';
import { Layout, Menu, Icon } from 'antd';

import { menu } from '../../constants';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const generateMenuMap = menu => {
  return menu.map(item => {
    if (item.children) {
      return (
        <SubMenu
          key={item.path}
          title={
            <div>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.title}</span>
            </div>
          }
        >
          {generateMenuMap(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Item key={item.path}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Item>
      );
    }
  });
};

export default class Side extends PureComponent {
  clickMenuItem = ({ key }) => router.push(key);

  render() {
    const { collapsed = false } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={collapsed} width={190}>
        <div className={styles.header}>
          <a href="/" className={styles.link}>
            <img
              className={styles.logo}
              src="https://preview.pro.ant.design/static/logo.f0355d39.svg"
              alt="logo"
            />
            <h1 className={styles.title} style={{ opacity: collapsed ? 0 : 1 }}>
              Jia Ming
            </h1>
          </a>
        </div>
        <Menu theme="dark" mode="inline" onClick={this.clickMenuItem}>
          {generateMenuMap(menu)}
        </Menu>
      </Sider>
    );
  }
}
