import GenreCard from '../components/GenreCard';
import PromotionBanners from '../components/PromotionBanners';
import BookCard from '../components/BookCard';
import { useBookContext } from '../contexts/BookContext';
import { Link } from 'react-router-dom';


function GenreCards() {
  const { genreData, genreLoading, genreError } = useBookContext();

  // console.log(genreData);
  // console.log(genreLoading);

  if (genreLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center gap-2 py-4"
        role="status"
      >
        <span
          className="spinner-border spinner-border-sm text-warning"
          aria-hidden="true"
        ></span>
        <span>Loading genres...</span>
      </div>
    );
}

if (genreError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Unable to load genres. Please try again later.
      </div>
    );
}

if (!Array.isArray(genreData) || genreData.length === 0) {
  return (
    <p className="text-muted text-center py-4">
      No genres are available right now.
    </p>
  );
}

  return (
    <div className="py-3">
      <div className="row">
        {genreData
              .slice(0, 6)
              .map((g) => <GenreCard key={g} genre={g} />)
          }
      </div>
      
      <div className="text-center mt-3 mb-2">
        <Link
          to="/books"
          className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold"
        >
          View All Genres
          <span className="ms-2" aria-hidden="true">→</span>
        </Link>
      </div>

    </div>
  );
}

function BookSection({ title, subtitle, filteredBooks, viewMoreUrl }) {
  const books = Array.isArray(filteredBooks) ? filteredBooks : [];

  return (
    <div className="container-fluid rounded mt-4 mb-5" style={{ backgroundColor: "#fff7cf" }}>

      <div className="text-center mb-4">
        <h2 className='fw-bold pt-3'>{title}</h2>
        <p className='text-muted'>
          {subtitle}
        </p>
      </div>

      {books.length === 0 ? (
        <p className='text-muted text-center py-4'>
          No books are available in this section right now.
        </p>
      ) : (
        <div className='row g-2'>
          {books.slice(0, 6).map((book) => (
            <div key={book._id} className='col-6 col-md-4 col-lg-2'>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}

      {/* <div className="row g-3">
        {filteredBooks.slice(0, 6).map((book) => (
          <div key={book._id} className="col-lg-2 col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
          </div>
        ))}
      </div> */}

      <div className='text-center mt-3 pb-4'>
        <Link to={viewMoreUrl} className='btn btn-outline-primary rounded-pill px-4 fw-semibold'>
          View All
          <span className="ms-2" aria-hidden="true">→</span>
        </Link>
      </div>
      

    </div>
  );
}

function FeaturedBookSection() {
  const { booksData, booksLoading, booksError } = useBookContext();


  if (booksLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center gap-2 py-5"
        role="status"
      >
        <span
          className="spinner-border spinner-border-sm text-primary"
          aria-hidden="true"
        ></span>
        <span>Loading books...</span>
      </div>
    );
  }

  if (booksError) {
    return (
      <div className="alert alert-danger text-center mx-3" role="alert">
        Unable to load books. Please try again later.
      </div>
    );
  }

  if (!Array.isArray(booksData) || booksData.length === 0) {
    return (
      <p className="text-muted text-center py-5">
        No books are available right now.
      </p>
    );
  }

  // console.log(booksData);
  const topRatedBooks = booksData.filter((book) => book.rating >= 4.0);
  // console.log(topRatedBooks);

  const newArrivalBooks = booksData.filter(
    (book) => new Date(book.publishedDate).getFullYear() > 2016
  );

  // console.log(newArrivalBooks);

  const mostDiscountedBooks = [...booksData]
    .filter((book) => book.discountPercentage >= 25)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);

  // console.log(mostDiscountedBooks);

  return (
    <div>
      <div>
        <BookSection 
          title="Readers' Favorites"
          subtitle="Stories and ideas readers love, rated 4 stars and above."
          filteredBooks={topRatedBooks} 
          viewMoreUrl='/books?rating=4stars_plus' 
        />
      </div>
      <div>
        <BookSection 
          title="Fresh on the Shelves"
          subtitle="Discover your next great read from our latest collection."
          filteredBooks={newArrivalBooks} 
          viewMoreUrl='/books?sort=newArrival' 
        />
      </div>
      <div>
        <BookSection
          title="Good Reads, Great Prices"
          subtitle="Find your next favorite book at a price you'll love."
          filteredBooks={mostDiscountedBooks}
          viewMoreUrl='/books?sort=deals' 
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-warning-subtle">
      <div className="container-fluid">
        <GenreCards />
        <PromotionBanners />
        <FeaturedBookSection />
      </div>
    </div>
  );
}
