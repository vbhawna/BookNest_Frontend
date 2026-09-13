import { Link } from 'react-router-dom';
import StarRating from './StarRating';


export default function BookCard({ book }) {
  const discountPrice =
    Math.round(book.originalPrice - (book.originalPrice * book.discountPercentage) / 100);
  return (
      <div className="card border-0 shadow-sm h-100 position-relative book-card">
        <Link className='link-underline-light' to={`/books/${book._id}`}>
          <div className="discount-ribbon">
            <strong>{book.discountPercentage}%</strong>
          </div>
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
              <span className="text-decoration-line-through me-3 text-muted">
                ₹{book.originalPrice}
              </span>
              <span className="fw-bold fs-6">₹{discountPrice}</span>
            </div>
            <div className="text-muted small mb-3">{book.format}</div>
          </div>
        </Link>
        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
          <Link
            to="#"
            className="text-decoration-none text-warning fw-semibold"
          >
            Add to Cart
          </Link>
          <StarRating rating={book.rating} />
        </div>
      </div>
  );
}
