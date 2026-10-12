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
      <div className="card border-0 shadow-sm h-100 position-relative book-card">
        <div className='position-absolute top-0 end-0'>
          <WishlistButton book={book} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} isInWishlist={isInWishlist} />
        </div>

        <Link className='link-underline-light' to={`/books/${book._id}`}>
          {book.discountPercentage > 0 && (
            <div className="discount-ribbon">
              <strong>{book.discountPercentage}%</strong>
            </div>
          )}
          <div className="text-center pt-3">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="img-fluid book-image"
            />
          </div>

          <div className="card-body">
            <h6 className="book-title">{book.title}</h6>
            <p className="author mb-1">by {book.authors.join(', ')}</p>
            <div className="mb-1">
              {book.discountPercentage > 0 && (
                <span className="text-decoration-line-through me-3 text-muted">
                  ₹{book.originalPrice}
                </span>
              )}
              <span className="fw-bold fs-6">₹{discountPrice}</span>
            </div>
            <div className="text-muted small mb-3">{book.format}</div>
          </div>
        </Link>
        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
          {book.stockQuantity > 0 ? isInCart(book._id) ? (
            <Link
              to="/cart"
              className="btn text-warning fw-semibold"
            >
                Go to Cart
            </Link>
            ) : (
              <button
                className="btn text-warning fw-semibold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div>
                <button type='button' className="btn text-secondary fw-semibold">Notify Me</button>
              </div>
            )}
          <StarRating rating={book.rating} />
        </div>
      </div>
  );
}
