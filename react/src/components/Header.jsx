import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          🗳️ VoteNow
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/help" className="nav-item">
            Help
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
