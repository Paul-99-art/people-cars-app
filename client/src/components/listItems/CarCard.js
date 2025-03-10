import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DELETE_CAR, GET_CARS } from '../../queries';
import EditCarForm from '../forms/EditCarForm';

const CarCard = ({ id, year, make, model, price, personId }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS }) || { cars: [] };
      cache.writeQuery({
        query: GET_CARS,
        data: { cars: cars.filter(car => car.id !== deleteCar.id) }
      });
    }
  });

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleDeleteCar = () => {
    deleteCar({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteCar: {
          __typename: 'Car',
          id
        }
      }
    });
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div>
      {editMode ? (
        <EditCarForm
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          title={`${year} ${make} ${model}`}
          className="car-card"
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <DeleteOutlined key="delete" onClick={handleDeleteCar} />
          ]}
        >
          <p>{formatPrice(price)}</p>
        </Card>
      )}
    </div>
  );
};

export default CarCard;