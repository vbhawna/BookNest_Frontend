import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-warning-subtle">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          BookNest
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/books" className="nav-link">
                Books
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/wishlist" className="nav-link">
                Wishlist
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
