import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './pages/Home';
import PersonDetails from './pages/PersonDetails';
import './App.css';

const { Content } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people/:id" element={<PersonDetails />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default App;