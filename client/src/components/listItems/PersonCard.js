import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GET_PEOPLE, DELETE_PERSON, GET_CARS } from '../../queries';
import CarCard from './CarCard';
import EditPersonForm from '../forms/EditPersonForm';

const PersonCard = ({ id, firstName, lastName }) => {
  const [editMode, setEditMode] = useState(false);
  const { loading, error, data } = useQuery(GET_CARS);
  const [deletePerson] = useMutation(DELETE_PERSON, {
    update(cache, { data: { deletePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: people.filter(person => person.id !== deletePerson.id) }
      });
    }
  });

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleDeletePerson = () => {
    deletePerson({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        deletePerson: {
          __typename: 'Person',
          id
        }
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter cars that belong to this person
  const personCars = data.cars.filter(car => car.personId === id);

  return (
    <div>
      {editMode ? (
        <EditPersonForm
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          className="person-card"
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <DeleteOutlined key="delete" onClick={handleDeletePerson} />
          ]}
        >
          {personCars.map(car => (
            <CarCard
              key={car.id}
              id={car.id}
              year={car.year}
              make={car.make}
              model={car.model}
              price={car.price}
              personId={car.personId}
            />
          ))}
          <Link to={`/people/${id}`} className="nav-link">LEARN MORE</Link>
        </Card>
      )}
    </div>
  );
};

export default PersonCard;