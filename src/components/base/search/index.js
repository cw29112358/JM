import React from 'react';
import { Form, Input, Button /* Select */ } from 'antd';

import styles from './index.less';

// const { Option } = Select;

const { Item } = Form;

function Search(props) {
  const { form, onSubmit, onReset } = props;
  const { getFieldDecorator } = form;

  // 确认事件
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  // 清空事件
  const resetFields = () => {
    form.resetFields();
    onReset(); // 清空父组件搜索条件
  };

  return (
    <div className={styles.form}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Item>{getFieldDecorator('name')(<Input placeholder="姓名" />)}</Item>
        <Item>{getFieldDecorator('principal')(<Input placeholder="负责人" />)}</Item>
        {/* <Item>
          {getFieldDecorator('sourceChannel')(
            <Select placeholder="请选择" style={{ width: 120 }}>
              <Option value="boss">BOSS</Option>
              <Option value="liepin">猎聘</Option>
              <Option value="lagou">拉钩</Option>
              <Option value="58">58同城</Option>
              <Option value="qcwy">前程无忧</Option>
              <Option value="introduction">同事介绍</Option>
              <Option value="other">其他</Option>
            </Select>
          )}
        </Item> */}
        <Item>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            搜索
          </Button>
          <Button onClick={resetFields}>清空</Button>
        </Item>
      </Form>
    </div>
  );
}

const SearchForm = Form.create({ name: 'talentSearchForm' })(Search);

export default React.memo(SearchForm);
