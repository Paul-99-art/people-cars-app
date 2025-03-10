import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Typography, Button } from 'antd';
import { GET_PERSON_WITH_CARS } from '../queries';
import CarCard from '../components/listItems/CarCard';

const { Title } = Typography;

const PersonDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.personWithCars) return <p>Person not found</p>;

  const { firstName, lastName, cars } = data.personWithCars;

  return (
    <div>
      <Link to="/" className="nav-link">
        <Button type="primary" style={{ marginBottom: '20px' }}>
          GO BACK HOME
        </Button>
      </Link>
      <Title level={2}>{firstName} {lastName}</Title>
      <Title level={3}>Cars</Title>
      {cars.length > 0 ? (
        cars.map(car => (
          <CarCard
            key={car.id}
            id={car.id}
            year={car.year}
            make={car.make}
            model={car.model}
            price={car.price}
            personId={car.personId}
          />
        ))
      ) : (
        <p>This person has no cars.</p>
      )}
    </div>
  );
};

export default PersonDetails;