import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import QuantityChanger from "../components/QuantityChanger.jsx";

export default function Cart() {
  const {
    cart,
    cartLoading,
    cartError,
    removeFromCart
  } = useCartContext();

  if (cartLoading) {
    return (
      <div className="container min-vh-100 text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading your cart items...</p>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="container min-vh-100 text-center py-5">
        <p className="text-danger">
          Something went wrong while loading your cart...
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
         <div className="container py-5 min-vh-100">
          <div className="text-center py-5">

            <div className="mb-3">
              <span className="display-4 text-muted">🛒</span>
            </div>

            <h2 className="fw-bold mb-3">
              Your Cart is Empty
            </h2>

            <p className="text-muted mb-1">
              Start exploring books & more you'll love.
            </p>

            <p className="text-muted mb-4">
              Explore our collection.
            </p>

            <Link
              to="/books"
              className="btn btn-outline-secondary px-4"
            >
              Shop Now
            </Link>

          </div>
        </div>
      );
  }

const discountPrice = (originalPrice, discountPercentage, quantity) => quantity * Math.round(
                        originalPrice - (originalPrice * discountPercentage) / 100
                      );

const discountAmount = (originalPrice, discountPercentage, quantity) => (quantity * originalPrice - discountPrice(originalPrice, discountPercentage, quantity));

const totalOriginalPrice = cart.items.reduce((total, item) => {
    return total + (item.book.originalPrice * item.quantity);
}, 0);

const totalDiscount = cart.items.reduce((total, item) => {
    return total + (discountAmount(item.book.originalPrice, item.book.discountPercentage, item.quantity));
}, 0);

const deliveryCharge = totalOriginalPrice >= 500 ? 0 : 50

const totalPrice = totalOriginalPrice - totalDiscount + deliveryCharge;

const totalItems = cart.items.reduce((total, item) => {
    return total + item.quantity;
}, 0);


  return (
    <div className="container-fluid py-3 min-vh-100">
      <div className="bg-white py-4">
        <div className="border-bottom py-3 pt-0 text-center">
          <h4>My Cart</h4>
          <p className="badge text-bg-warning">{totalItems} books</p>
        </div>
        {cart.items.map((item) => (
          <div key={item.book._id} className="border-bottom">
          <div className="row py-3 mx-5 align-items-center">
            <div className="col-3 col-md-2 text-center">
              <img
                    src={item.book.coverImageUrl}
                    alt={item.book.title}
                    className="img-fluid"
                    style={{
                        maxHeight: "100px",
                        objectFit: "contain",
                    }}
                />
            </div>
            <div className="col-9 col-md-10">
              <div className="d-flex justify-content-between">
                <div>
                    <Link to={`/books/${item.book._id}`} className="text-decoration-none text-dark">
                      <h5 className="fw-semibold mb-3">{item.book.title}</h5>
                    </Link>

                    <div>
                      <QuantityChanger item={item} />
                    </div>
                </div>

                <div className="text-end">
                    <button
                        type="button"
                        className="btn btn-outline-warning text-secondary p-1 mb-3"
                        onClick={() =>
                            removeFromCart(item.book._id)
                        }
                    >
                        🗑
                    </button>

                    <div>
                      <span className="fw-bold fs-5">
                        ₹{discountPrice(item.book.originalPrice, item.book.discountPercentage, item.quantity)}
                      </span>
                    </div>

                    <div>
                      <span className="text-decoration-line-through text-muted small">
                          ₹{item.quantity * item.book.originalPrice}
                      </span>
                    </div>

                    <span className="badge bg-success-subtle text-success mt-1">
                            ₹{discountAmount(item.book.originalPrice, item.book.discountPercentage, item.quantity)} OFF
                    </span>

                </div>

              </div>
            </div>
          </div>
        </div>
        ))}

        <div className="row px-3">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm mt-4 px-5">
          <div className="card-body">
              <h5 className="border-bottom pb-3">
                  Price Details
              </h5>

              <div className="d-flex justify-content-between mb-2">
                  <span>Price ({totalItems} books)</span>
                  <span>₹{totalOriginalPrice}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <span className="text-success">
                      -₹{totalDiscount}
                  </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                  <span>Delivery Charge</span>
                  <span>
                      {deliveryCharge === 0
                          ? "FREE"
                          : `₹${deliveryCharge}`}
                  </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
              </div>
          </div>
        </div>
          </div>
        </div>
        <div className="py-4 mx-5 d-flex justify-content-end flex-wrap gap-4">
          <button className="btn btn-outline-warning">Proceed to Checkout</button>
          <Link to="/" className="btn btn-outline-warning">+ Add More Books</Link>
        </div>
      </div>
    </div>
  );
}
