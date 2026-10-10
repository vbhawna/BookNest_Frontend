import { Link } from "react-router-dom";

const genreImages = {
  Fiction: "/images/genres/Fiction.jpg",
  "Non-Fiction": "/images/genres/Non-Fiction.jpg",
  Biography: "/images/genres/Biography.jpg",
  Academic: "/images/genres/Academic.jpg",
  Mystery: "/images/genres/Mystery.jpg",
  Thriller: "/images/genres/Thriller.jpg",
};

const fallbackImage = "/images/genres/Fiction.jpg";

export default function GenreCard({ genre }) {
  const image = genreImages[genre] || fallbackImage;

  return (
    <div className="col-6 col-lg-2 mb-3">
      <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
      <Link
        to={`/books?genre=${encodeURIComponent(genre)}`}
        className="text-decoration-none"
      >
      <div className="position-relative bg-light rounded-top-4 overflow-hidden">
        <img
          src={image}
          alt={`Explore ${genre} books`}
          className="card-img-top w-100 object-fit-contain"
          style={{ height: "280px" }}
          loading="lazy"
        />

        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3 bg-dark bg-opacity-25">
          <span className="bg-light text-dark rounded-3 px-3 py-2 fw-semibold shadow-sm">
            {genre}
          </span>
        </div>
      </div>
      </Link>
      </div>
    </div>
  );
}