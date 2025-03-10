import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../queries';

const AddCarForm = () => {
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS }) || { cars: [] };
      cache.writeQuery({
        query: GET_CARS,
        data: { cars: [...cars, addCar] }
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.people || data.people.length === 0) {
    return null; // Hide the form when there are no people
  }

  const onFinish = values => {
    const { year, make, model, price, personId } = values;
    addCar({
      variables: {
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addCar: {
          __typename: 'Car',
          id: 'temp-id',
          year: parseInt(year),
          make,
          model,
          price: parseFloat(price),
          personId
        }
      }
    });
    form.resetFields();
  };

  return (
    <div>
      <h2>Add Car</h2>
      <Form
        form={form}
        name="add-car-form"
        onFinish={onFinish}
        layout="inline"
        style={{ marginBottom: '20px' }}
      >
        <Form.Item
          name="year"
          rules={[{ required: true, message: 'Please input year!' }]}
          label="Year:"
        >
          <InputNumber placeholder="Year" min={1900} max={2100} />
        </Form.Item>
        <Form.Item
          name="make"
          rules={[{ required: true, message: 'Please input make!' }]}
          label="Make:"
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          name="model"
          rules={[{ required: true, message: 'Please input model!' }]}
          label="Model:"
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Please input price!' }]}
          label="Price:"
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
          label="Person:"
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
            Add Car
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCarForm;