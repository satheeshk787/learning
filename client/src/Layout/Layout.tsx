import React from 'react'
import { Outlet } from 'react-router-dom';
import './Layout.css'
import Header from './components/Header';
import Footer from './components/Footer';

const Layout: React.FC = () => {
  return (
    <main>
      <Header />
        <div className='container'><Outlet /></div>
      <Footer />
    </main>
  );
};

export default Layout;
