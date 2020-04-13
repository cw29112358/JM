import React from 'react';
import { Drawer } from 'antd';

import BasicInfo from './basicInfo';

function ArchiveDrawer(props) {
  const { onClose, onSubmit, visible, title = '表单', forminfo = [] } = props;

  return (
    <Drawer
      title={title}
      placement="right"
      closable={false}
      width={850}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ padding: 0, position: 'relative' }}
      headerStyle={{ margin: 0 }}
    >
      <BasicInfo onClose={onClose} onSubmit={onSubmit} forminfo={forminfo} />
    </Drawer>
  );
}

export default React.memo(ArchiveDrawer);
