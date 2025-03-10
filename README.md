# People and Cars App

A web application to keep track of people and their cars using React, Apollo Client, GraphQL, and Express.

## Project Structure

```
people-cars-app/
├── server/     # GraphQL server with Apollo Server and Express
├── client/     # React app with Apollo Client
└── README.md
```

## Features

- Display a list of people and their cars
- Add, edit, and remove people
- Add, edit, and remove cars
- Associate cars with people
- View detailed information about a person and their cars
- Optimistic UI updates for all CRUD operations

## Setup and Installation

### Server

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run dev
   ```

The GraphQL server will be running at http://localhost:4000/graphql

### Client

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the client:
   ```
   npm start
   ```

The React application will be running at http://localhost:3000

## Technical Implementation

- **GraphQL Schema**: Defines Person and Car types and their relationships
- **Resolvers**: Implements CRUD operations for both Person and Car types
- **Apollo Client**: Manages state and data fetching on the client
- **React Router**: Handles navigation between home and detail views
- **Optimistic UI**: Provides immediate feedback for user actions
- **Form Validation**: Validates inputs for both Person and Car forms

## Hope you liked it!!
## Stay tuned for more updates!!