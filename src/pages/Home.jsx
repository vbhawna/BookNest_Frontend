import GenreCard from '../components/GenreCard';
import PromotionBanners from '../components/PromotionBanners';
import BookCard from '../components/BookCard';
import { useBookContext } from '../contexts/BookContext';
import { Link } from 'react-router-dom';

function GenreCards() {
  const { genreData, genreLoading, genreError } = useBookContext();

  // console.log(genreData);
  // console.log(genreLoading);
  return (
    <div className="py-3">
      <div className="row">
        {genreData
          ? genreData
              .slice(0, 4)
              .map((g, index) => <GenreCard genre={g} index={index} />)
          : genreLoading && <p>Loading...</p>}
      </div>
      <Link to='/books'>View More</Link>
    </div>
  );
}

function BookSection({ title, filteredBooks, viewMoreUrl }) {
  return (
    <div className="container-fluid mt-4">
      <div className="text-center mb-4">
        <h2>{title} Books</h2>
        <p>Enjoy {title} Books!</p>
      </div>
      <div className="row g-3">
        {filteredBooks.slice(0, 6).map((book) => (
          <div key={book._id} className="col-lg-2 col-md-3 col-sm-6 mb-4">
          <BookCard book={book} />
          </div>
        ))}
      </div>
      <Link to={viewMoreUrl}>View All</Link>
    </div>
  );
}

function FeaturedBookSection() {
  const { booksData, booksLoading, booksError } = useBookContext();

  console.log(booksData);
  const topRatedBooks = booksData.filter((book) => book.rating >= 4.0);
  console.log(topRatedBooks);

  const newArrivalBooks = booksData.filter(
    (book) => new Date(book.publishedDate).getFullYear() > 2016
  );

  console.log(newArrivalBooks);

  const mostDiscountedBooks = booksData
    .filter((book) => book.discountPercentage >= 25)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);

  console.log(mostDiscountedBooks);

  return (
    <div>
      <div>
        <BookSection title="Top Rated" filteredBooks={topRatedBooks} viewMoreUrl='/books?rating=4.0stars_plus' />
      </div>
      <div>
        <BookSection title="New Arrival" filteredBooks={newArrivalBooks} viewMoreUrl='/books?sort=newArrival' />
      </div>
      <div>
        <BookSection
          title="Today's Deals"
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
