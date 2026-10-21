import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import StarRating from '../components/StarRating';
import { useState } from "react";
import { useWishlistContext } from "../contexts/WishlistContext";
import WishlistButton from '../components/WishlistButton';
import { useCartContext } from "../contexts/CartContext";
import QuantityChanger from "../components/QuantityChanger";
import { toast } from "react-toastify";

export default function BookDetails() {
    const [showAll, setShowAll] = useState(false);

    const { bookId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isValidBookId = /^[a-fA-F0-9]{24}$/.test(bookId);

    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

    const { cart, isInCart, addToCart } = useCartContext();
    
    const { data, loading, error } = useFetch(`https://book-nest-project1.vercel.app/books/${bookId}`);

    // console.log(data);

    if (!isValidBookId) {
        return (
        <div className="container py-5 text-center">
            <div className="alert alert-warning" role="alert">
            <h5 className="alert-heading">Invalid Book ID</h5>
            <p className="mb-3">
                The book ID is invalid. Please select a book from our collection.
            </p>
            <Link to="/books" className="btn btn-warning">
                Browse Books
            </Link>
            </div>
        </div>
        );
    }

    if (loading) {
        return (
        <div className="container py-5 text-center" role="status">
            <div
            className="spinner-border text-warning mb-3"
            aria-hidden="true"
            />
            <p className="text-muted">Loading book details...</p>
        </div>
        );
    }

    if (error) {
        const isNotFound = error.status === 404;

        return (
            <div className="container py-5 text-center">
                <div
                className={`alert ${isNotFound ? "alert-warning" : "alert-danger"}`}
                role="alert"
                >
                <h5 className="alert-heading">
                    {isNotFound ? "Book Not Found" : "Unable to Load Book"}
                </h5>

                <p className="mb-3">
                    {isNotFound
                    ? "This book does not exist or is no longer available."
                    : "We couldn't load this book. Please check your connection and try again."}
                </p>

                <Link to="/books" className="btn btn-warning">
                    Browse Books
                </Link>
                </div>
            </div>
        );
    }

    if (!data || typeof data !== "object" || Array.isArray(data) || !data._id) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-warning" role="alert">
                <h5 className="alert-heading">Book Not Found</h5>
                <p className="mb-3">
                    We couldn't find the requested book.
                </p>
                <Link to="/books" className="btn btn-warning">
                    Browse Books
                </Link>
                </div>
            </div>
        );
    }

    const discountPrice =
    Math.round(data.originalPrice - (data.originalPrice * data.discountPercentage) / 100);

    const description = data.description ?? "";
    const bookSummary = showAll ? description : description.slice(0, 135);

    const handleBuyNow = async () => {
        const success = await addToCart(data._id);

        if(success) {
            navigate("/cart");
        }
    };


    const item = cart?.items?.find((item) => item.book._id === data._id);

    // console.log(item);

    const handleBack = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/books");
        }
    };

    const handleAddToCart = async () => {
        const result = await addToCart(data._id);
        
        if (result) {
                toast.success("Book added to the cart successfully.");
        } else {
            toast.error("Unable to add the book in the cart. Please try again.");
        }
    };


    return (
        <div className="py-4">
                <div className="container-fluid">
                    <div className="mb-3">
                        <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-3"
                        onClick={handleBack}
                        >
                        &larr; Back
                        </button>
                    </div>

                    <div className="row g-4 mb-5">
                        
                    <div className="col-12 col-lg-5">
                        <div
                            className="bg-white rounded p-3 p-md-4 d-flex justify-content-center align-items-center shadow"
                            style={{ minHeight: "300px", height: "clamp(300px, 55vw, 480px)" }}
                        >
                            <img
                            src={data.coverImageUrl || "/images/book-placeholder.png"}
                            alt={data.title}
                            className="img-fluid border rounded shadow"
                            style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                width: "auto",
                                objectFit: "contain",
                            }}
                            loading="lazy"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = "/images/book-placeholder.png";
                            }}
                            />
                        </div>
                    </div>

                        <div className="col-12 col-lg-7">
                            <div className="bg-white rounded p-4 h-100 shadow">

                                <div className="d-flex justify-content-between align-items-center gap-3">
                                    <h2 className="fs-3 fw-bold lh-sm mb-2">{data.title}</h2>
                                    <WishlistButton book={data} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} isInWishlist={isInWishlist} />
                                </div>

                                <p className="text-secondary fs-6 mb-3">by {data.authors?.join(', ')}</p>

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <StarRating rating={data.rating} /> {' '}
                                    <span className="text-muted small">{data.rating} / 5</span>
                                </div>

                                <div className="mb-3 d-flex flex-wrap gap-2">
                                    {(data.genres ?? []).map((genre) => (
                                        <span key={genre} className="badge bg-body-secondary text-dark small fw-medium py-2 px-2 rounded-pill">{genre}{' '}</span>
                                    ))}
                                </div>

                                
                                <div className="mb-1 d-flex flex-wrap align-items-center gap-3">
                                    {data.discountPercentage > 0 && (
                                        <span className="text-decoration-line-through text-muted">
                                        MRP: ₹{data.originalPrice}
                                        </span>
                                    )}

                                    <span className="fw-bold fs-5">
                                        ₹{discountPrice}
                                    </span>

                                    {data.discountPercentage > 0 && (
                                        <span className="bg-success text-white py-1 px-2 rounded-2 small fw-semibold">
                                        {data.discountPercentage}% Off
                                        </span>
                                    )}
                                </div>


                                <small className="text-muted">(Incl. of all taxes)</small>

                                <div className="mt-3 mb-4">
                                    {
                                        data.stockQuantity > 0 
                                            ? <p className="fw-semibold fs-6 text-success">● In Stock</p> 
                                            : <p className="fw-semibold fs-6 text-danger">● Out of Stock</p>
                                    }
                                </div>

                                {isInCart(data._id) && (
                                    <div className="mt-3 mb-4">
                                        <QuantityChanger item={item} />
                                    </div>
                                )}

                                <div className="d-flex flex-wrap gap-4 mb-5">
                                    {data.stockQuantity > 0 ? (isInCart(data._id) ? (
                                                <Link
                                                    to="/cart"
                                                    className="btn btn-outline-warning py-3 px-4 fw-semibold rounded-2"
                                                >
                                                    Go to Cart
                                                </Link>
                                            ) : (
                                            <>
                                                <button 
                                                    type='button' 
                                                    className="btn btn-outline-warning py-3 px-4 fw-semibold rounded-2" 
                                                    style={{ minWidth: "230px"}}
                                                    onClick={handleAddToCart}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button 
                                                    className="btn btn-outline-warning py-3 px-4 fw-semibold rounded-2" 
                                                    style={{ minWidth: "230px"}}
                                                    onClick={handleBuyNow}
                                                >
                                                    Buy Now
                                                </button>
                                            </>
                                            ))
                                     : <button 
                                            type='button' 
                                            className="btn btn-outline-secondary py-3 px-4 fw-semibold rounded-2" 
                                            style={{ minWidth: "230px"}}
                                            onClick={() => toast.info("This book is currently out of stock.")}
                                        >
                                            Notify Me
                                        </button>}
                                    
                                </div>

                                <div className="row text-center py-3">
                                    <div className="col-md-3">
                                        <p className="bg-secondary-subtle rounded border border-dark-subtle border-3 py-2 mb-1">🕲</p>
                                        <p className="small text-muted fw-semibold">Piracy Free</p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className="bg-secondary-subtle rounded border border-dark-subtle border-3 py-2 mb-1">🚚</p>
                                        <p className="small text-muted fw-semibold">Express Delivery</p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className="bg-secondary-subtle rounded border border-dark-subtle border-3 py-2 mb-1">💳🛡️</p>
                                        <p className="small text-muted fw-semibold">Secure Transaction</p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className="bg-secondary-subtle rounded border border-dark-subtle border-3 py-2 mb-1">♻️</p>
                                        <p className="small text-muted fw-semibold">Eco-Friendly Packaging</p>
                                    </div>
                                </div>

                                <div className="card py-2 mt-3 mb-4 overflow-hidden shadow-sm">
                                    <div className="card-title bg-light py-2 px-3 border-bottom">
                                        <h4 className="fs-5 fw-bold mb-0 text-center">Book Summary</h4>
                                    </div>
                                    <div className="card-body p-3">
                                        <p className="text-body-secondary mb-2">
                                            {bookSummary}
                                            {!showAll && description.length > 135 ? "..." : ""}
                                        </p>

                                        {description.length > 135 && (
                                            <div className="text-center">
                                                <button type='button' className="btn btn-link p-0 text-decoration-none text-dark fw-semibold" onClick={() => setShowAll(!showAll)}>
                                                    {showAll ? "View Less" : "View More"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="card py-2 mt-3 mb-4 overflow-hidden shadow-sm">
                                    <div className="card-title bg-light py-2 px-3 border-bottom">
                                        <h4 className="fs-5 fw-bold mb-0 text-center">Other Details</h4>
                                    </div>
                                    
                                    <div className="card-body p-3">
                                        <div className="row py-3 border-bottom-0">
                                            <div className="col-sm-3 text-secondary fw-semibold">Authors - </div>
                                            <div className="col-sm-9">{data.authors?.join(', ')}</div>
                                        </div>

                                        <div className="row py-3 border-bottom-0">
                                            <div className="col-sm-3 text-secondary fw-semibold">Publisher - </div>
                                            <div className="col-sm-9">{data.publisher}</div>
                                        </div>

                                        <div className="row py-3 border-bottom-0">
                                            <div className="col-sm-3 text-secondary fw-semibold">Binding - </div>
                                            <div className="col-sm-9">{data.format}</div>
                                        </div>

                                        <div className="row py-3 border-bottom-0">
                                            <div className="col-sm-3 text-secondary fw-semibold">Language - </div>
                                            <div className="col-sm-9">{data.language}</div>
                                        </div>

                                        <div className="row py-3 border-bottom-0">
                                            <div className="col-sm-3 text-secondary fw-semibold">Pages - </div>
                                            <div className="col-sm-9">{data.numberOfPages}</div>
                                        </div>

                                        <div className="row py-3 border-bottom-0">
                                            <div className="col-sm-3 text-secondary fw-semibold">Published Date - </div>
                                            <div className="col-sm-9">{new Date(data.publishedDate).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}