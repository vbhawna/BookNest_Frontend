import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfStroke, FaRegStar } from 'react-icons/fa6';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStarts = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="text-warning">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}

      {halfStar && <FaStarHalfStroke />}

      {[
        ...Array(emptyStarts).map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        )),
      ]}
    </div>
  );
}

export default function BookCard({ book }) {
  const discountPrice =
    Math.round(book.originalPrice - (book.originalPrice * book.discountPercentage) / 100);
  return (
      <div className="card border-0 shadow-sm h-100 position-relative book-card">
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
