import { Link } from "react-router-dom";

export default function GenreCard({ genre, index }) {
  return (
    <div key={index} className="col-md-3">
      <div className="card">
        <Link to={`/books?genre=${genre}`}>
          <div className="card-body">
            <div className="position-relative">
              <img
                src="https://images.pexels.com/photos/38179077/pexels-photo-38179077.jpeg"
                className="img-fluid"
              />
              <span className="text-bg-light p-4 position-absolute top-50 start-50 translate-middle">
                {genre}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
