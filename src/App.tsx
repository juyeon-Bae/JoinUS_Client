import React from 'react';
import styled from 'styled-components';
import GNB from './components/main/GNB';
import Footer from './components/main/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './NotFound';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Unauthorized from './Unauthorized';

const AppContainer = styled.div``;

const MainContainer = styled.main``;

function App() {
  const location = useLocation();
  const showGNBAndFooter = 
    location.pathname === '/';

  return (
    <AppContainer>
      {showGNBAndFooter && <GNB />}
      <MainContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContainer>
      {showGNBAndFooter && <Footer />}
    </AppContainer>
  );
}

export default App;
