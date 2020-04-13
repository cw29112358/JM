import React from 'react';
import { Avatar, Button } from 'antd';

import styles from './index.less';

function Header(props) {
  const { title = '', type = '', openDrawer } = props;
  return (
    <div className={styles.flex}>
      <div className={styles.left}>
        <Avatar icon="team" size={35} className={styles.avatar} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.right}>
        {type === 'talentPool' && (
          <>
            <Button type="primary" className={styles.btn}>
              批量导入
            </Button>
            <Button type="primary" onClick={openDrawer}>
              新建
            </Button>
          </>
        )}
        {type === 'overView' && (
          <Button type="primary" onClick={openDrawer}>
            用工需求申请
          </Button>
        )}
      </div>
    </div>
  );
}

export default React.memo(Header);
