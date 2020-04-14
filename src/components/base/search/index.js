import React from 'react';
import { Form, Input, Button } from 'antd';

import styles from './index.less';

const { Item } = Form;

function Search(props) {
  const { form, onSubmit, onReset } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  const resetFields = () => {
    form.resetFields();
    onReset();
  };

  return (
    <div className={styles.form}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Item>{getFieldDecorator('name')(<Input placeholder="姓名" />)}</Item>
        <Item>{getFieldDecorator('principal')(<Input placeholder="负责人" />)}</Item>
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
