import React, { useState } from 'react';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import InventoryManagement from './components/InventoryManagement/InventoryManagement';
import './Home.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="hospital-website">
        <Header userData={userData} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <InventoryManagement userData={userData} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="hospital-website">
      <Header userData={userData} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <main className="main-content">
        <Banner onLogin={handleLogin} />
      </main>
    </div>
  );
};

export default Home;
