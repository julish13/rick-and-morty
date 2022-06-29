import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Characters, NotFound } from '@screens';
import { Layout } from '@components';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Navigate replace to="/characters" />} />
      <Route path="characters" element={<Characters />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
