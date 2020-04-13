import React from 'react';
import { Table } from 'antd';

import styles from './index.less';

function TalentTable(props) {
  const {
    columns = [],
    data = [],
    current = 1,
    pageSize = 10,
    onChangePage,
    onShowSizeChange,
  } = props;

  return (
    <div>
      <Table
        bordered
        size="small"
        rowKey="_id"
        dataSource={data.list}
        columns={columns}
        className={styles.talentTable}
        pagination={{
          current,
          hideOnSinglePage: false,
          total: data.total,
          showTotal: total => `共 ${total} 条数据`,
          showSizeChanger: true,
          pageSize,
          onShowSizeChange: onShowSizeChange,
          onChange: onChangePage,
        }}
      />
    </div>
  );
}

export default React.memo(TalentTable);
