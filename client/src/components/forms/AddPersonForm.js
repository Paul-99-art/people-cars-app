import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button } from 'antd';
import { ADD_PERSON, GET_PEOPLE } from '../../queries';

const AddPersonForm = () => {
  const [form] = Form.useForm();
  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addPerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: [...people, addPerson] }
      });
    }
  });

  const onFinish = values => {
    const { firstName, lastName } = values;
    addPerson({
      variables: {
        firstName,
        lastName
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPerson: {
          __typename: 'Person',
          id: 'temp-id',
          firstName,
          lastName
        }
      }
    });
    form.resetFields();
  };

  return (
    <div>
      <h2>Add Person</h2>
      <Form
        form={form}
        name="add-person-form"
        layout="inline"
        onFinish={onFinish}
        style={{ marginBottom: '20px' }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
          label="First Name:"
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input last name!' }]}
          label="Last Name:"
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Person
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPersonForm;