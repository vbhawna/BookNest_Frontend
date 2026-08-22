export default function PromotionBanners() {
  return (
    <div id="bookBannerCarousel" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#bookBannerCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#bookBannerCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#bookBannerCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.pexels.com/photos/31880175/pexels-photo-31880175.jpeg"
            className="d-block w-100 hero-image"
            alt="First Banner"
          />
          <div className="carousel-caption d-none d-md-block">
            <h4>A Book for Every Reader</h4>
            <h5>
              Fiction, Business, Self-Help, Biography, Comics, Academic, and
              much more—find exactly what you're looking for.
            </h5>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg"
            className="d-block w-100 hero-image"
            alt="second banner"
          />
          <div className="carousel-caption d-none d-md-block">
            <h4>Discover Your Next Great Read</h4>
            <h5>
              From timeless classics to modern bestsellers, explore a world of
              stories, knowledge, and inspiration—all in one place.
            </h5>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/13616263/pexels-photo-13616263.jpeg"
            className="d-block w-100 hero-image"
            alt="Third Banner"
          />
          <div className="carousel-caption d-none d-md-block">
            <h4>Every Book Opens a New World</h4>
            <h5>
              Whether you're seeking adventure, learning a new skill, or
              escaping into fiction, there's a perfect book waiting for you.
            </h5>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bookBannerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bookBannerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
