import React, { useState, useEffect } from 'react';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Footer from './Footer';
import { FaChevronUp } from 'react-icons/fa';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
       <Header />
      
       <MobileHeader />
      
       <main className="flex-grow">
        {children}
      </main>
      
       <Footer />
    </div>
  );
};

export default AppLayout;
