import React from 'react';
import { Form, Row, Col, Input, Select, Button, Upload, Icon, DatePicker } from 'antd';

import styles from './index.less';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formAllSpanLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function transform(info) {
  let title = '';
  switch (info) {
    case 'basic':
      title = '基础信息';
      break;
    case 'classified':
      title = '分类信息';
      break;
    case 'resume':
      title = '简历信息';
      break;
    case 'interview':
      title = '面试安排';
      break;
    case 'recruitmentNeeds':
      title = '招聘需求';
      break;
    case 'attachmentInfo':
      title = '附件信息';
      break;
    default:
      title = '';
  }
  return title;
}

function BasicInfo(props) {
  const { form, onClose, onSubmit, forminfo = [] } = props;
  const { getFieldDecorator, getFieldValue } = form;
  const source = getFieldValue('sourceChannel');

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
        form.resetFields();
      }
    });
  };

  return (
    <Form {...formItemLayout} labelAlign="left" onSubmit={handleSubmit} className={styles.form}>
      {Object.entries(forminfo).map((form, index) => {
        return (
          <div key={`${form[0]}_${index}`}>
            <div className={styles.title}>{transform(form[0])}</div>
            <Row className={styles.row} gutter={10}>
              {form[1].map(item => {
                if (item.component === 'select') {
                  return (
                    <Col span={12} key={item.value}>
                      <Item label={item.label}>
                        {getFieldDecorator(item.value, {
                          rules: item.rules && item.rules,
                        })(
                          <Select placeholder="请选择">
                            {item.options.map(option => (
                              <Option value={option.value} key={option.value}>
                                {option.label}
                              </Option>
                            ))}
                          </Select>,
                        )}
                      </Item>
                    </Col>
                  );
                } else if (item.component === 'textArea') {
                  return (
                    <Col span={24} key={item.value}>
                      <Item label={item.label} {...formAllSpanLayout}>
                        {getFieldDecorator(item.value, {
                          rules: item.rules && item.rules,
                        })(
                          <TextArea
                            placeholder={`请填写${item.label}`}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />,
                        )}
                      </Item>
                    </Col>
                  );
                } else if (item.component === 'upload') {
                  return (
                    <Col span={24} key={item.value}>
                      <Item label={item.label} {...formAllSpanLayout}>
                        {getFieldDecorator(item.value, {
                          rules: item.rules && item.rules,
                        })(
                          <Upload>
                            <Button>
                              <Icon type="upload" />
                              上传简历
                            </Button>
                          </Upload>,
                        )}
                      </Item>
                    </Col>
                  );
                } else if (item.component === 'datePicker') {
                  return (
                    <Col span={12} key={item.value}>
                      <Item label={item.label}>
                        {getFieldDecorator(item.value, {
                          rules: item.rules && item.rules,
                        })(<DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />)}
                      </Item>
                    </Col>
                  );
                } else {
                  return (
                    <Col span={12} key={item.value}>
                      <Item label={item.label}>
                        {getFieldDecorator(item.value, {
                          rules: item.rules && item.rules,
                        })(<Input placeholder={`请填写${item.label}`} />)}
                      </Item>
                    </Col>
                  );
                }
              })}
              {form[0] === 'basic' && source === 'introduction' ? (
                <Col span={12}>
                  <Form.Item label="同事姓名">
                    {getFieldDecorator('colleague', {
                      rules: [{ required: true, message: '请填写同事姓名' }],
                    })(<Input placeholder="请填写同事姓名" />)}
                  </Form.Item>
                </Col>
              ) : form[0] === 'basic' && source === 'other' ? (
                <Col span={12}>
                  <Form.Item label="其他">
                    {getFieldDecorator('otherSource', {
                      rules: [{ required: true, message: '请填写其他来源' }],
                    })(<Input placeholder="请填写其他来源" />)}
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
          </div>
        );
      })}
      <div className={styles.footer}>
        <Button onClick={onClose} className={styles.closeBtn}>
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </div>
    </Form>
  );
}

const BasicInfoForm = Form.create({ name: 'basicInfoForm' })(BasicInfo);

export default React.memo(BasicInfoForm);
