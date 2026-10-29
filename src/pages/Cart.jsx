import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useWishlistContext } from "../contexts/WishlistContext";
import { toast } from "react-toastify";
import QuantityChanger from "../components/QuantityChanger.jsx";
import {
  calculateDeliveryCharge, 
  calculateDiscountAmount, 
  calculateItemPrice, 
  calculateTotalDiscount, 
  calculateTotalItems, 
  calculateTotalOriginalPrice, 
  calculateTotalPrice} from '../utils/cartCalculations.js';

export default function Cart() {
  const {
    cart,
    cartLoading,
    cartError,
    removeFromCart
  } = useCartContext();

  const {
    wishlist,
    wishlistLoading,
    isInWishlist,
    addToWishlist,
  } = useWishlistContext();

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

  const handleAddToWishlist = async (book) => {
    if (isInWishlist(book._id)) {
      toast.info("This book is already in your wishlist.");
      return;
    }

    const success = await addToWishlist(book);

    if (success) {
      toast.success("Book added to your wishlist successfully.");
    } else {
      toast.error("Unable to add the book to your wishlist.");
    }
  };

// const discountPrice = (originalPrice, discountPercentage, quantity) => quantity * Math.round(
//                         originalPrice - (originalPrice * discountPercentage) / 100
//                       );


// const discountAmount = (originalPrice, discountPercentage, quantity) => (quantity * originalPrice - calculateDiscountAmount(originalPrice, discountPercentage, quantity));

// const totalOriginalPrice = cart.items.reduce((total, item) => {
//     return total + (item.book.originalPrice * item.quantity);
// }, 0);

// const totalDiscount = cart.items.reduce((total, item) => {
//     return total + (discountAmount(item.book.originalPrice, item.book.discountPercentage, item.quantity));
// }, 0);

// const deliveryCharge = totalOriginalPrice >= 500 ? 0 : 50

// const totalPrice = totalOriginalPrice - totalDiscount + deliveryCharge;

// const totalItems = cart.items.reduce((total, item) => {
//     return total + item.quantity;
// }, 0);


  return (
    <div className="container-fluid py-3 min-vh-100">
      <div className="bg-white py-4">
        <div className="border-bottom py-3 pt-0 text-center">
          <h4>My Cart</h4>
          <p className="badge text-bg-warning">{calculateTotalItems(cart.items)} books</p>
        </div>
        <div className="row g-4 px-3 px-md-4">
          <div className="col-12 col-lg-8">
            {cart.items.map((item) => (
              <div key={item.book._id} className="border-bottom">
              <div className="row py-3 mx-0 mx-md-5 align-items-start">
                <div className="col-3 col-md-2 text-center">
                  <img
                        src={item.book.coverImageUrl || "/images/book-placeholder.png"}
                        alt={item.book.title}
                        className="img-fluid"
                        style={{
                            maxHeight: "100px",
                            objectFit: "contain",
                        }}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            "/images/book-placeholder.png";
                        }}
                    />
                </div>

                <div className="col-9 col-sm-10">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <Link to={`/books/${item.book._id}`} className="text-decoration-none text-dark flex-grow-1">
                      <h5 className="fw-semibold mb-2">{item.book.title}</h5>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-outline-warning text-secondary btn-sm flex-shrink-0"
                      aria-label={`Remove ${item.book.title} from cart`}
                      onClick={() => removeFromCart(item.book._id)}
                    >
                      🗑
                    </button>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <div>
                      <span className="fw-bold fs-5">
                        ₹{calculateItemPrice(item.book.originalPrice, item.book.discountPercentage)}
                        {/* ₹{discountPrice(item.book.originalPrice, item.book.discountPercentage, item.quantity)} */}
                      </span>
                    </div>

                    <div>
                      <span className="text-decoration-line-through text-muted small">
                          ₹{item.book.originalPrice}
                      </span>
                    </div>

                    <span className="badge bg-success-subtle text-success">
                            ₹{calculateDiscountAmount(item.book.originalPrice, item.book.discountPercentage)} OFF
                    </span>
                  </div>

                  <div className="d-flex flex-column align-items-start gap-2">
                    <QuantityChanger item={item} compact />

                    <div className="mt-2">
                      {isInWishlist(item.book._id) ? (
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          disabled
                        >
                          ♥ Already in Wishlist
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          disabled={wishlistLoading || !wishlist}
                          onClick={() => handleAddToWishlist(item.book)}
                        >
                          ♡ Add to Wishlist
                        </button>
                      )}
                    </div>
                  </div>              
                </div>
              </div>
            </div>
            ))}
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm px-2 px-md-3">
              <div className="card-body">
                  <h5 className="border-bottom pb-3">
                      Price Details
                  </h5>

                  <div className="d-flex justify-content-between mb-2">
                      <span>Price ({calculateTotalItems(cart.items)} books)</span>
                      <span>₹{calculateTotalOriginalPrice(cart.items)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                      <span>Discount</span>
                      <span className="text-success">
                          -₹{calculateTotalDiscount(cart.items)}
                      </span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                      <span>Delivery Charge</span>
                      <span>
                          {calculateDeliveryCharge(cart.items) === 0
                              ? "FREE"
                              : `₹${calculateDeliveryCharge(cart.items)}`}
                      </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total Amount</span>
                      <span>₹{calculateTotalPrice(cart.items)}</span>
                  </div>
              </div>
            
            </div>

            <div className="py-4 px-3 d-flex justify-content-center justify-content-lg-end">
              <Link to="/checkout" className="btn btn-outline-warning">Proceed to Checkout</Link>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
