import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@components';

const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ '@screens/NotFound.js'));
const Characters = lazy(() =>
  import(/* webpackChunkName: "characters" */ '@screens/Characters.js')
);

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
