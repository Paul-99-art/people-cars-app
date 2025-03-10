import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import { UPDATE_CAR, GET_PEOPLE } from '../../queries';

const EditCarForm = ({ id, year, make, model, price, personId, onButtonClick }) => {
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [updateCar] = useMutation(UPDATE_CAR);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onFinish = values => {
    const { year, make, model, price, personId } = values;
    updateCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateCar: {
          __typename: 'Car',
          id,
          year: parseInt(year),
          make,
          model,
          price: parseFloat(price),
          personId
        }
      }
    });
    onButtonClick();
  };

  return (
    <Form
      form={form}
      name="edit-car-form"
      layout="vertical"
      initialValues={{ year, make, model, price, personId }}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: 'Please input year!' }]}
        label="Year"
      >
        <InputNumber min={1900} max={2100} />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: 'Please input make!' }]}
        label="Make"
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: 'Please input model!' }]}
        label="Model"
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: 'Please input price!' }]}
        label="Price"
      >
        <InputNumber
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          step={0.01}
          min={0}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: 'Please select a person!' }]}
        label="Person"
      >
        <Select placeholder="Select a person">
          {data.people.map(person => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
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

export default EditCarForm;