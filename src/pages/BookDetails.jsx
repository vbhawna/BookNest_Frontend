import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import StarRating from '../components/StarRating';
import { useState } from "react";

export default function BookDetails() {
    const [showAll, setShowAll] = useState(false);

    const { bookId } = useParams();
    
    const { data, loading, error } = useFetch(`https://book-nest-project1.vercel.app/books/${bookId}`);

    console.log(data);

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger mt-5">Something went wrong while fetching the book.</p>;
    }

    if (!data) {
        return <p className="text-center mt-5">Book not found.</p>;
    }

    const discountPrice =
    Math.round(data.originalPrice - (data.originalPrice * data.discountPercentage) / 100);

    const bookSummary = showAll ? data.description : data.description.slice(0, 135);

    return (
        <div className="py-4">
                <div className="container-fluid">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-5 col-md-6">
                            <div className="bg-white rounded p-4 d-flex justify-content-center align-items-center shadow" style={{ minHieight: '480px' }}>
                                <img src={data.coverImageUrl} alt={data.title} className="border rounded img-fluid w-auto object-fit-contain shadow" style={{ maxHeight: '480px' }}/>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6">
                            <div className="bg-white rounded p-4 h-100 shadow">

                                <div className="d-flex justify-content-between align-items-center gap-3">
                                    <h2 className="fs-3 fw-bold lh-sm mb-2">{data.title}</h2>
                                    <button type="button" className="btn btn-light border rounded-circle fs-3 px-3 py-2" aria-label="Add book to wishlist">♡</button>
                                </div>

                                <p className="text-secondary fs-6 mb-3">by {data.authors?.join(', ')}</p>

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <StarRating rating={data.rating} /> {' '}
                                    <span className="text-muted small">{data.rating} / 5</span>
                                </div>

                                <div className="mb-3 d-flex flex-wrap gap-2">
                                    {data.genres.map(g => (
                                        <span key={g} className="badge bg-body-secondary text-dark small fw-medium py-2 px-2 rounded-pill">{g}{' '}</span>
                                    ))}
                                </div>

                                <div className="mb-1 d-flex flex-wrap align-items-center gap-3">
                                    <span className="text-decoration-line-through text-muted">MRP: ₹{data.originalPrice}</span>
                                    <span className="fw-bold fs-6">₹{discountPrice}</span>
                                    <span className="bg-success text-white py-1 px-2 rounded-2 small fw-semibold">{data.discountPercentage}% Off</span>
                                </div>

                                <small className="text-muted">(Incl. of all taxes)</small>

                                <div className="mt-3 mb-4">
                                    {data.stockQuantity > 0 ? <p className="fw-semibold fs-6 text-success">● In Stock</p> : <p className="fw-semibold fs-6 text-danger">● Out of Stock</p>}
                                </div>

                                <div className="d-flex flex-wrap gap-4 mb-5">
                                    {data.stockQuantity > 0 ? (
                                        <>
                                            <button type='button' className="btn btn-outline-warning py-3 px-4 fw-semibold rounded-2" style={{ minWidth: "230px"}}>Add to Cart</button>
                                            <button type='button' className="btn btn-outline-warning py-3 px-4 fw-semibold rounded-2" style={{ minWidth: "230px"}}>Buy Now</button>
                                        </>
                                    ) : <button type='button' className="btn btn-outline-secondary py-3 px-4 fw-semibold rounded-2" style={{ minWidth: "230px"}}>Notify Me</button>}
                                    
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
                                            {!showAll && data.description.length > 135 ? "..." : ""}
                                        </p>

                                        {data.description.length > 135 && (
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