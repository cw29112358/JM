import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Divider, Spin } from 'antd';
import { router } from 'umi';

import Header from 'components/base/header';
import JobTable from 'components/base/table';
import Drawer from 'components/base/drawer';
import { getJobsAction, createJobAction, deleteJobAction } from '../actions';
import { jobDemandForm, jobStatusMapping } from '../constants/jobDemand';

class JobDemand extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: 1,
      pageSize: 10,
      jobs: {},
    };
    this.columns = [
      {
        title: '岗位名称',
        dataIndex: 'jobName',
        key: 'jobName',
        width: 100,
      },
      {
        title: '工作地点',
        dataIndex: 'address',
        key: 'address',
        width: 100,
      },
      {
        title: '岗位序列',
        dataIndex: 'jobSequence',
        key: 'jobSequence',
        width: 100,
      },
      {
        title: '需求人数',
        dataIndex: 'demand',
        key: 'demand',
        width: 100,
      },
      {
        title: '申请部门',
        dataIndex: 'department',
        key: 'department',
        width: 100,
      },
      {
        title: '岗位状态',
        dataIndex: 'jobStatus',
        key: 'jobStatus',
        width: 100,
        render: text => <div>{jobStatusMapping[text]}</div>,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <>
            <Button type="link" onClick={this.action.bind(this, record._id, 'detail')}>
              详情
            </Button>
            <Divider type="vertical" />
            <Button type="link" onClick={this.action.bind(this, record._id, 'delete')}>
              删除
            </Button>
          </>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getJobs();
  }

  action(id, type) {
    if (type === 'detail') {
      router.push(`/JM/recruitment/jobDemand/detail?id=${id}`);
    } else {
      const { jobs } = this.state;
      const cloneJobs = [...jobs.list];
      const newJobs = cloneJobs.filter(item => item._id !== id);
      this.setState({ jobs: Object.assign({}, jobs, { list: newJobs }) });
      this.props.deleteJob(id);
    }
  }

  getJobs = data => this.props.getJobs(data, jobs => this.setState({ jobs }));

  openDrawer = () => this.setState({ visible: true });

  closeDrawer = () => this.setState({ visible: false });

  onDrawerSubmit = values => {
    const { current, pageSize } = this.state;
    this.props.createJob(values);
    this.closeDrawer();
    this.getJobs({
      current,
      limit: pageSize,
    });
  };

  onChangePage = (current, pageSize) => {
    this.getJobs({
      current,
      limit: pageSize,
    }).then(() => this.setState({ current }));
  };

  onShowSizeChange = (current, pageSize) => {
    this.getJobs({
      current,
      limit: pageSize,
    }).then(() => this.setState({ current, pageSize }));
  };

  render() {
    const { loading } = this.props;
    const { current, jobs, pageSize, visible } = this.state;
    return (
      <div>
        <Header type="overView" title="用工需求申请" openDrawer={this.openDrawer} />
        <Spin spinning={loading}>
          <JobTable
            current={current}
            data={jobs}
            columns={this.columns}
            pageSize={pageSize}
            onChangePage={this.onChangePage}
            onShowSizeChange={this.onShowSizeChange}
          />
        </Spin>
        <Drawer
          title="创建用工需求申请"
          visible={visible}
          forminfo={jobDemandForm}
          onClose={this.closeDrawer}
          onSubmit={this.onDrawerSubmit}
        />
      </div>
    );
  }
}

export default connect(
  ({ job }) => ({
    jobs: job.jobs,
    loading: job.loading,
  }),
  dispatch => ({
    getJobs: (data, callback) => dispatch(getJobsAction(data, callback)),
    createJob: data => dispatch(createJobAction(data)),
    deleteJob: id => dispatch(deleteJobAction(id)),
  }),
)(JobDemand);
