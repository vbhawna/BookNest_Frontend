import { Link } from "react-router-dom";
import { useWishlistContext } from "../contexts/WishlistContext";
import BookCard from "../components/BookCard";

export default function Wishlist() {
  const { wishlist, wishlistLoading, wishlistError } = useWishlistContext();

  if (wishlistLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading your wishlist...</p>
      </div>
    );
  }

  if (wishlistError) {
    return (
      <div className="container text-center py-5">
        <p className="text-danger">
          Something went wrong while loading your wishlist.
        </p>
      </div>
    );
  }

  console.log(wishlist)
  return (
    <div className="min-vh-100 bg-light">
       {wishlist?.books.length === 0 ? (
         <div className="container py-5">
          <div className="text-center py-5">

            <div className="mb-3">
              <span className="display-4 text-muted">♡</span>
            </div>

            <h2 className="fw-bold mb-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-muted mb-1">
              Save books you love and find them here later.
            </p>

            <p className="text-muted mb-4">
              Explore our collection and add your favorite books.
            </p>

            <Link
              to="/books"
              className="btn btn-outline-secondary px-4"
            >
              Explore Books
            </Link>

          </div>
        </div>
        ) : (<div>
              <div className="container py-4">

                <div className="mb-4">
                  <h2 className="fw-bold mb-1">
                    My Wishlist
                  </h2>

                  <p className="text-muted mb-0">
                    {wishlist?.books.length} books saved
                  </p>
                </div>

                <div className="row g-4">
                  {wishlist?.books.map((book) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                      key={book._id}
                    >
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>

              </div>
        </div>)}
    </div>
  );
}
