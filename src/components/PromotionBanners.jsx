export default function PromotionBanners() {
  return (
    <div
      id="bookBannerCarousel"
      className="carousel slide carousel-fade shadow-sm rounded-4 overflow-hidden mb-4"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#bookBannerCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Go to slide 1"
        ></button>

        <button
          type="button"
          data-bs-target="#bookBannerCarousel"
          data-bs-slide-to="1"
          aria-label="Go to slide 2"
        ></button>

        <button
          type="button"
          data-bs-target="#bookBannerCarousel"
          data-bs-slide-to="2"
          aria-label="Go to slide 3"
        ></button>
      </div>

      {/* Carousel slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.pexels.com/photos/31880175/pexels-photo-31880175.jpeg"
            className="d-block w-100 object-fit-cover"
            style={{ height: "400px" }}
            alt="Books representing different genres and interests"
          />

          <div className="carousel-caption d-block bg-dark bg-opacity-50 rounded-3 p-2 p-md-4">
            <h2 className="h4 fw-bold mb-2">
              A Book for Every Reader
            </h2>
            <p className="mb-0 d-none d-sm-block">
              Fiction, Business, Self-Help, Biography, Comics, Academic,
              and much more—find exactly what you're looking for.
            </p>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg"
            className="d-block w-100 object-fit-cover"
            style={{ height: "400px" }}
            alt="A reading scene inviting readers to discover their next book"
          />

          <div className="carousel-caption d-block bg-dark bg-opacity-50 rounded-3 p-2 p-md-4">
            <h2 className="h4 fw-bold mb-2">
              Discover Your Next Great Read
            </h2>
            <p className="mb-0 d-none d-sm-block">
              From timeless classics to modern bestsellers, explore a world
              of stories, knowledge, and inspiration—all in one place.
            </p>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/13616263/pexels-photo-13616263.jpeg"
            className="d-block w-100 object-fit-cover"
            style={{ height: "400px" }}
            alt="Books offering opportunities for adventure and learning"
          />

          <div className="carousel-caption d-block bg-dark bg-opacity-50 rounded-3 p-2 p-md-4">
            <h2 className="h4 fw-bold mb-2">
              Every Book Opens a New World
            </h2>
            <p className="mb-0 d-none d-sm-block">
              Whether you're seeking adventure, learning a new skill, or
              escaping into fiction, there's a perfect book waiting for you.
            </p>
          </div>
        </div>
      </div>

      {/* Previous button */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bookBannerCarousel"
        data-bs-slide="prev"
        aria-label="Previous promotion"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>

      {/* Next button */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bookBannerCarousel"
        data-bs-slide="next"
        aria-label="Next promotion"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
