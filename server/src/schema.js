const { gql } = require('apollo-server-express');
const { find, remove, filter } = require('lodash');

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
];

const cars = [
  {
    id: '1',
    year: 2019,
    make: 'Toyota',
    model: 'Corolla',
    price: 40000,
    personId: '1'
  },
  {
    id: '2',
    year: 2018,
    make: 'Lexus',
    model: 'LX 600',
    price: 13000,
    personId: '1'
  },
  {
    id: '3',
    year: 2017,
    make: 'Honda',
    model: 'Civic',
    price: 20000,
    personId: '1'
  },
  {
    id: '4',
    year: 2019,
    make: 'Acura',
    model: 'MDX',
    price: 60000,
    personId: '2'
  },
  {
    id: '5',
    year: 2018,
    make: 'Ford',
    model: 'Focus',
    price: 35000,
    personId: '2'
  },
  {
    id: '6',
    year: 2017,
    make: 'Honda',
    model: 'Pilot',
    price: 45000,
    personId: '2'
  },
  {
    id: '7',
    year: 2019,
    make: 'Volkswagen',
    model: 'Golf',
    price: 40000,
    personId: '3'
  },
  {
    id: '8',
    year: 2018,
    make: 'Kia',
    model: 'Sorento',
    price: 45000,
    personId: '3'
  },
  {
    id: '9',
    year: 2017,
    make: 'Volvo',
    model: 'XC40',
    price: 55000,
    personId: '3'
  }
];

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
    person: Person
  }

  type Query {
    people: [Person]
    person(id: ID!): Person
    personWithCars(id: ID!): Person
    cars: [Car]
    car(id: ID!): Car
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    updatePerson(id: ID!, firstName: String!, lastName: String!): Person
    deletePerson(id: ID!): Person
    
    addCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car
    updateCar(id: ID!, year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car
    deleteCar(id: ID!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => find(people, { id }),
    personWithCars: (_, { id }) => {
      const person = find(people, { id });
      if (!person) return null;
      return person;
    },
    cars: () => cars,
    car: (_, { id }) => find(cars, { id })
  },
  Person: {
    cars: (parent) => filter(cars, { personId: parent.id })
  },
  Car: {
    person: (parent) => find(people, { id: parent.personId })
  },
  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = {
        id: String(people.length + 1),
        firstName,
        lastName
      };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = find(people, { id });
      if (!person) return null;
      
      person.firstName = firstName;
      person.lastName = lastName;
      
      return person;
    },
    deletePerson: (_, { id }) => {
      const personIndex = people.findIndex(person => person.id === id);
      if (personIndex === -1) return null;
      
      const [person] = people.splice(personIndex, 1);
      
      remove(cars, car => car.personId === id);
      
      return person;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = {
        id: String(cars.length + 1),
        year,
        make,
        model,
        price,
        personId
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (_, { id, year, make, model, price, personId }) => {
      const car = find(cars, { id });
      if (!car) return null;
      
      car.year = year;
      car.make = make;
      car.model = model;
      car.price = price;
      car.personId = personId;
      
      return car;
    },
    deleteCar: (_, { id }) => {
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) return null;
      
      const [car] = cars.splice(carIndex, 1);
      return car;
    }
  }
};

module.exports = { typeDefs, resolvers };