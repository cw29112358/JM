import React, { PureComponent } from 'react';
import { Alert } from 'antd';

import LoginFrom from 'components/feature';
import styles from './index.less';

class Feature extends PureComponent {
  render() {
    return (
      <div className={styles.feature}>
        <Alert message="用户名：admin 密码：admin123" type="info" banner />
        <div className={styles.header}>
          <img
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            height={44}
            className={styles.logo}
          />
          <span className={styles.title}>JM</span>
        </div>
        <div className={styles.descTop}>
          JM是一款基于SaaS模式(Software as a Service软件即服务)的企业管理软件。
        </div>
        <div className={styles.descBottom}>
          JM以商贸企业的核心业务：采购、销售、库存（进销存）为切入点，最终目标是行业化的ERP解决方案。
        </div>
        <div className={styles.form}>
          <LoginFrom />
        </div>
      </div>
    );
  }
}

export default Feature;
