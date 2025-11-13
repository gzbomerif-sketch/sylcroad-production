import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-left">
          <h2 className="logo-text">Sylcroad</h2>
        </div>
        <div className="logo-right">
          <span className="brand-text">Analytics</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

