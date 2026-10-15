import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useWishlistContext } from '../contexts/WishlistContext';
import WishlistButton from './WishlistButton';
import { useCartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';


export default function BookCard({ book }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistContext();
  const { isInCart, addToCart } = useCartContext();  

  const discountPrice =
    Math.round(book.originalPrice - (book.originalPrice * book.discountPercentage) / 100);

  const handleAddToCart = async () => {
    const result = await addToCart(book._id);
    
    if (result) {
            toast.success("Book added to the cart successfully.");
    } else {
        toast.error("Unable to add the book in the cart. Please try again.");
    }
  };
    
    return (
      <div className="card border-0 shadow-sm h-100 position-relative book-card rounded-3 overflow-hidden d-flex flex-column">
        <div className='position-absolute top-0 end-0'>
          <WishlistButton book={book} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} isInWishlist={isInWishlist} />
        </div>

        <Link 
          className='link-underline-light d-flex flex-column flex-grow-1' 
          to={`/books/${book._id}`}
          state={{ from: location.pathname + location.search }}
        >
          {book.discountPercentage > 0 && (
            <div className="discount-ribbon">
              <strong>{book.discountPercentage}%</strong>
            </div>
          )}
          <div className="d-flex justify-content-center align-items-center pt-3 px-2">
            <div 
              className="d-flex justify-content-center align-items-center w-100"
              style={{ height: "220px" }}
            >
              <img
                src={book.coverImageUrl || "/images/book-placeholder.png"}
                alt={book.title}
                className="img-fluid book-image"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/book-placeholder.png";
                }}
              />
            </div>
          </div>

          <div className="card-body">
            <h6 className="book-title fw-semibold mb-2 text-dark">{book.title}</h6>

            <p className="author mb-2 small">by {book.authors.join(', ').slice(0, 40)}</p>

            <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
              {book.discountPercentage > 0 && (
                <span className="text-decoration-line-through me-3 text-muted">
                  ₹{book.originalPrice}
                </span>
              )}

              <span className="fw-bold fs-5 text-dark">₹{discountPrice}</span>
            </div>

            <div className="mb-0">
              <span className="badge bg-light text-secondary border">
                {book.format}
              </span>
            </div>
          </div>
        </Link>
        <div className="card-footer bg-light border-0 d-flex justify-content-between align-items-center gap-1 mt-auto px-2">
          {book.stockQuantity > 0 ? isInCart(book._id) ? (
            <Link
              to="/cart"
              className="btn btn-warning btn-sm rounded-pill fw-semibold px-2 flex-shrink-0"
            >
                Go to Cart
            </Link>
            ) : (
              <button
                className="btn btn-warning btn-sm rounded-pill fw-semibold px-2 flex-shrink-0"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div>
                <button type='button' className="btn text-secondary fw-semibold px-2 flex-shrink-0">Notify Me</button>
              </div>
            )}
          <StarRating rating={book.rating} />
        </div>
      </div>
  );
}
