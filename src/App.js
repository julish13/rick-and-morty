import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, LoadingSpinner } from '@components';

const NotFoundScreen = lazy(() =>
  import(/* webpackChunkName: "not-found" */ '@screens/NotFoundScreen.js')
);
const CharactersScreen = lazy(() =>
  import(/* webpackChunkName: "characters" */ '@screens/CharactersScreen.js')
);
const CharacterDetailsScreen = lazy(() =>
  import(/* webpackChunkName: "characters" */ '@screens/CharacterDetailsScreen.js')
);

const App = () => (
  <Layout>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Navigate replace to="characters" />} />
        <Route path="characters" element={<CharactersScreen />}>
          <Route path=":id" element={<CharacterDetailsScreen />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Suspense>
  </Layout>
);

export default App;
