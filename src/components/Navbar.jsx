import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useWishlistContext } from "../contexts/WishlistContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { cart } = useCartContext();
  const { wishlist } = useWishlistContext();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const wishlistCount = wishlist?.books?.length ?? 0;

  const cartCount = 
    cart?.items?.reduce(
      (total, item) => total + (item.quantity ?? 0), 
      0
    ) ?? 0;

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

  const navLinkClass = ({ isActive }) =>
    `nav-link px-1 fw-bold ${
      isActive ? "active text-dark" : "text-secondary"
  }`;

  return (
    <nav 
      className="navbar navbar-expand-lg py-2 shadow-sm" 
      style={{ backgroundColor: "#f8e6b0" }}
    >
      <div className="container-fluid px-3 px-lg-4">

        <NavLink 
          to="/" 
          className="navbar-brand fw-bold me-3"
          style={{
            color: "#790d0d",
            fontSize: "1.4rem",
            whiteSpace: "nowrap",
          }}  
        >
          BookNest
        </NavLink>

        <button
          className="navbar-toggler flex-shrink-0 me-2"
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
          <ul className="navbar-nav flex-row align-items-center gap-3 me-lg-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/books" className={navLinkClass}>
                Books
              </NavLink>
            </li>
          </ul>

          <div className="d-flex flex-grow-1 my-2 my-lg-0 me-lg-3"
            style={{ minWidth: 0 }}>
            <input
              className="form-control rounded-pill px-3"
              style={{
                minWidth: 0,
                borderColor: "#d9c38c",
                backgroundColor: "#fffdf7",
              }}
              type="search"
              placeholder="Search books or authors..."
              aria-label="Search books or authors..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <ul className="navbar-nav flex-row align-items-center gap-3 ms-lg-auto mb-0">
            <li className="nav-item">
              <NavLink to="/profile" className={navLinkClass} aria-label="Profile">
                <span className="fs-5">👤</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/wishlist" 
                className={`${navLinkClass({ isActive: false })} d-flex align-items-center gap-0`}
                aria-label={`Wishlist, ${wishlistCount} books`}  
              >
                <span className="fs-2 fw-bold position-relative">♡</span>
                {wishlistCount > 0 && (
                  <span className="badge rounded-pill bg-danger">{wishlistCount}</span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/cart" 
                className={`${navLinkClass({ isActive: false })} d-flex align-items-center gap-0`}
                aria-label={`Cart, ${cartCount} items`}
              >
                <span className="fs-5">🛒</span>
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger">{cartCount}</span>
                )}
              </NavLink>
            </li>

          </ul>
          
        </div>
      </div>
    </nav>
  );
}
