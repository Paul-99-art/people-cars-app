import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography } from 'antd';
import { GET_PEOPLE } from '../queries';
import AddPersonForm from '../components/forms/AddPersonForm';
import AddCarForm from '../components/forms/AddCarForm';
import PersonCard from '../components/listItems/PersonCard';

const { Title } = Typography;

const Home = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Title level={2} className="title">PEOPLE AND THEIR CARS</Title>
      <div className="form-container">
        <AddPersonForm />
        {data.people.length > 0 && <AddCarForm />}
      </div>
      <Title level={3}>Records</Title>
      {data.people.map(person => (
        <PersonCard
          key={person.id}
          id={person.id}
          firstName={person.firstName}
          lastName={person.lastName}
        />
      ))}
    </div>
  );
};

export default Home;