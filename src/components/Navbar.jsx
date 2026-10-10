import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const updatedParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      updatedParams.set("search", value.trim());
    } else {
      updatedParams.delete("search");
    }

    const queryString = updatedParams.toString();

    navigate(
      {
        pathname: "/books",
        search: queryString ? `?${queryString}` : "",
      },
      { replace: true }
    );
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#f8e6b0" }}>
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

          <div className="d-flex my-2 my-lg-0 me-lg-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search books or authors..."
              aria-label="Search books or authors..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

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
