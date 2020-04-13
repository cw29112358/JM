import React, { PureComponent } from 'react';
import { Divider, Button, Spin } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import Header from 'components/base/header';
import TalentTable from 'components/base/table';
import { sourceChannelMap } from 'constants/recruitment/talent';
import { toggleFavoriteAction, getTalentPoolAction } from 'actions/recruitment/talent';
import { changeFavoriteList } from 'utils/helper';

import styles from '../index.less';

class MyFocus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      talentPool: {},
    };
    this.columns = [
      {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
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
    this.getTalentPool({ favorite: true });
  }

  getTalentPool = data =>
    this.props.getTalentPool(data, talentPool => this.setState({ talentPool }));

  changeFavorite(record) {
    this.props.toggleFavorite(record._id, record.favorite);
    const { talentPool } = this.state;
    const newList = changeFavoriteList(talentPool, record);
    this.setState({ talentPool: Object.assign({}, talentPool, { list: newList }) });
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
    const { loading } = this.props;
    const { current, pageSize, talentPool } = this.state;
    return (
      <div>
        <Header type="myFocus" title="我关注的人才" />
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
  }),
)(MyFocus);
