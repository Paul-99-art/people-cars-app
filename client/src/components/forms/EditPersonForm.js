import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button } from 'antd';
import { UPDATE_PERSON } from '../../queries';

const EditPersonForm = ({ id, firstName, lastName, onButtonClick }) => {
  const [form] = Form.useForm();
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = values => {
    const { firstName, lastName } = values;
    updatePerson({
      variables: {
        id,
        firstName,
        lastName
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePerson: {
          __typename: 'Person',
          id,
          firstName,
          lastName
        }
      }
    });
    onButtonClick();
  };

  return (
    <Form
      form={form}
      name="edit-person-form"
      layout="inline"
      initialValues={{ firstName, lastName }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please input first name!' }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input last name!' }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button onClick={onButtonClick} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPersonForm;