import React, { PureComponent } from 'react';
import { Divider, Button, Spin } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import Header from 'components/base/header';
import TalentTable from 'components/base/table';
import Drawer from 'components/base/drawer';
import { sourceChannelMap, talentPoolForm } from 'constants/recruitment/talent';
import {
  toggleFavoriteAction,
  getTalentPoolAction,
  createTalentAction,
} from 'actions/recruitment/talent';
import { changeFavoriteList } from 'utils/helper';

import styles from '../index.less';

class TalentPool extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: 1,
      pageSize: 10,
      talentPool: {},
    };
    this.columns = [
      {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
        width: 200,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 80,
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 110,
      },
      {
        title: '近期联系时间',
        dataIndex: 'recentContactTime',
        key: 'recentContactTime',
        width: 150,
        render: text => text && moment(text).format('YYYY-MM-DD HH:mm'),
      },
      {
        title: '负责人',
        dataIndex: 'principal',
        key: 'principal',
        width: 80,
      },
      {
        title: '来源渠道',
        dataIndex: 'sourceChannel',
        key: 'sourceChannel',
        width: 100,
        render: (text, record) =>
          sourceChannelMap[text]
            ? sourceChannelMap[text]
            : text === 'introduction'
            ? record.colleague
            : record.otherSource,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <>
            <Button type="link">分配</Button>
            <Divider type="vertical" />
            <Button type="link">发送短信</Button>
            <Divider type="vertical" />
            <span className={styles.favorite} onClick={this.changeFavorite.bind(this, record)}>
              {record.favorite ? '取消关注' : '关注'}
            </span>
          </>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getTalentPool();
  }

  getTalentPool = data =>
    this.props.getTalentPool(data, talentPool => this.setState({ talentPool }));

  openDrawer = () => this.setState({ visible: true });

  closeDrawer = () => this.setState({ visible: false });

  onDrawerSubmit = values => {
    const { current, pageSize } = this.state;
    this.props.createTalent(values).then(() => {
      this.closeDrawer();
      this.getTalentPool({
        current,
        limit: pageSize,
      });
    });
  };

  changeFavorite(data) {
    this.props.toggleFavorite(data._id, data.favorite);
    const { talentPool } = this.state;
    const newTalent = changeFavoriteList(talentPool, data);
    this.setState({ talentPool: Object.assign({}, talentPool, { list: newTalent }) });
  }

  onChangePage = (current, pageSize) => {
    this.getTalentPool({
      current,
      limit: pageSize,
    }).then(() => this.setState({ current }));
  };

  onShowSizeChange = (current, pageSize) => {
    this.getTalentPool({
      current,
      limit: pageSize,
    }).then(() => this.setState({ current, pageSize }));
  };

  render() {
    const { visible, current, pageSize, talentPool } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Header type="talentPool" title="人才库" openDrawer={this.openDrawer} />
        <Spin spinning={loading}>
          <TalentTable
            current={current}
            data={talentPool}
            columns={this.columns}
            pageSize={pageSize}
            onChangePage={this.onChangePage}
            onShowSizeChange={this.onShowSizeChange}
          />
        </Spin>
        <Drawer
          title="创建人才档案"
          forminfo={talentPoolForm}
          visible={visible}
          onClose={this.closeDrawer}
          onSubmit={this.onDrawerSubmit}
        />
      </div>
    );
  }
}

export default connect(
  ({ talent }) => ({
    loading: talent.loading,
  }),
  dispatch => ({
    toggleFavorite: (id, favorite) => dispatch(toggleFavoriteAction(id, favorite)),
    getTalentPool: (data, callback) => dispatch(getTalentPoolAction(data, callback)),
    createTalent: data => dispatch(createTalentAction(data)),
  }),
)(TalentPool);
