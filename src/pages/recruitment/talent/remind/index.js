import React, { PureComponent } from 'react';
import { Tabs, Spin } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import Header from 'components/base/header';
import TalentTable from 'components/base/table';
import { getTalentContactListAction } from 'actions/recruitment/talent';

const { TabPane } = Tabs;

class Remind extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: 'overDue',
      current: 1,
      pageSize: 10,
      talentPool: {},
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 80,
      },
      {
        title: '联系内容',
        dataIndex: 'contactContent',
        key: 'contactContent',
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 120,
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
    ];
  }

  componentDidMount() {
    this.getTalentContactList({ contact: 'overDue' });
  }

  getTalentContactList = payload =>
    this.props.getTalentContactList(payload, talentPool => this.setState({ talentPool }));

  changeTabs = key => {
    const { pageSize } = this.state;
    this.getTalentContactList({ contact: key, limit: pageSize }).then(() =>
      this.setState({ key, current: 1 }),
    );
  };

  onChangePage = (page, pageSize) => {
    const { key } = this.state;
    this.getTalentContactList({
      contact: key,
      current: page,
      limit: pageSize,
    }).then(() => this.setState({ current: page }));
  };

  onShowSizeChange = (current, pageSize) => {
    const { key } = this.state;
    this.getTalentContactList({
      contact: key,
      current,
      limit: pageSize,
    }).then(() => this.setState({ current, pageSize }));
  };

  render() {
    const { key, current, pageSize, talentPool } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Header type="remind" title="联系提醒" />
        <Tabs activeKey={key} onChange={this.changeTabs}>
          <TabPane tab="逾期未联系的人才" key="overDue">
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
          </TabPane>
          <TabPane tab="明天要联系的人才" key="tomorrow">
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
          </TabPane>
          <TabPane tab="即将要联系的人才" key="soon">
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
          </TabPane>
          <TabPane tab="未来要联系的人才" key="futuer">
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
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  ({ talent }) => ({
    loading: talent.loading,
  }),
  dispatch => ({
    getTalentContactList: (data, callback) => dispatch(getTalentContactListAction(data, callback)),
  }),
)(Remind);
