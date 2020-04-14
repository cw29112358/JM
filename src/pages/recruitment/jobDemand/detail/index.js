import React, { PureComponent } from 'react';
import { Spin, Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import { getJobDetailAction } from '../../actions';
import { jobListMapping, jobStatusMapping } from '../../constants/jobDemand';
import styles from './index.less';

const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  componentDidMount() {
    const { getJobDetail, location = {} } = this.props;
    getJobDetail(location.query && location.query.id);
  }

  toggleEdit = () => this.setState({ edit: !this.state.edit });

  render() {
    const { jobDetail, loading, form } = this.props;
    const { edit } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Spin spinning={loading}>
        <div className={styles.jobName}>
          岗位名称：{jobDetail.jobName}
          {edit && (
            <Button type="primary" style={{ float: 'right' }} onClick={this.toggleEdit}>
              保存
            </Button>
          )}
          <Button
            type="primary"
            onClick={this.toggleEdit}
            style={{ float: 'right', marginRight: 5 }}
          >
            {edit ? '取消编辑' : '编辑'}
          </Button>
        </div>
        <Form {...formItemLayout} labelAlign="left" className={styles.form}>
          <Row gutter={10}>
            {Object.keys(jobDetail).map(item => {
              if (item === 'jobStatus') {
                return (
                  <Col span={8} key={item}>
                    <Item label={jobListMapping[item]}>
                      {getFieldDecorator(item, {
                        initialValue: jobDetail[item] && jobDetail[item],
                      })(edit ? <Input /> : <div>{jobStatusMapping[jobDetail[item]]}</div>)}
                    </Item>
                  </Col>
                );
              } else if (item === 'date') {
                return (
                  <Col span={8} key={item}>
                    <Item label={jobListMapping[item]}>
                      {getFieldDecorator(item, {
                        initialValue: jobDetail[item] && moment(jobDetail[item]),
                      })(
                        edit ? (
                          <DatePicker
                            showTime={{ format: 'YYYY-MM-DD HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                          />
                        ) : (
                          <div>{moment(jobDetail[item]).format('YYYY-MM-DD HH:mm')}</div>
                        ),
                      )}
                    </Item>
                  </Col>
                );
              } else {
                return (
                  <Col span={8} key={item}>
                    <Item label={jobListMapping[item]}>
                      {getFieldDecorator(item, {
                        initialValue: jobDetail[item] && jobDetail[item],
                      })(edit ? <Input /> : <div>{jobDetail[item]}</div>)}
                    </Item>
                  </Col>
                );
              }
            })}
          </Row>
        </Form>
      </Spin>
    );
  }
}

const DetailForm = Form.create({ name: 'detailForm' })(Detail);

export default connect(
  ({ job }) => ({
    jobDetail: job.jobDetail,
    loading: job.loading,
  }),
  dispatch => ({
    getJobDetail: id => dispatch(getJobDetailAction(id)),
  }),
)(DetailForm);
