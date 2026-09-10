import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useBookContext } from '../contexts/BookContext';
import { useSearchParams } from 'react-router-dom';

const GenreFilter = ({genres}) => {
  const [showAll, setShowAll] = useState(false);
  const [ searchParams, setSearchParams ] = useSearchParams();

  const genreParams = searchParams.get("genre");
  const selectedGenres = genreParams ? genreParams.split('_') : [];

  const visibleGenres = showAll ? genres : genres.slice(0, 8);

  const handleGenreChange = (genre, isChecked) => {
  
  if(isChecked && !selectedGenres.includes(genre)) {
    const updatedGenres =  [...selectedGenres, genre];
    searchParams.set("genre", updatedGenres.join('_'));
  } else {
    const updatedGenres = selectedGenres.filter((g) => g !== genre);

    if(updatedGenres.length === 0) {
      searchParams.delete('genre');
    } else {
      searchParams.set('genre', updatedGenres.join('_'));
    }
  }
  setSearchParams(searchParams);

};

  return (
    <div>
      {visibleGenres.map((genre) => (
        <div key={genre}>
          <input 
            type='checkbox' 
            checked={selectedGenres.includes(genre)} 
            id={genre}
            onChange={(event) => handleGenreChange(genre, event.target.checked)} 
          /> {' '}

          <label htmlFor={genre}>{genre}</label>
        </div>
      ))}

      {genres.length > 8 && (
        <button onClick={() => setShowAll(!showAll)} className='btn btn-link p-0 text-decoration-none'>
          {showAll ? 'SHOW LESS' : 'SHOW MORE'}
        </button>
      )}
    </div>
  );
}

const PriceFilter = () => {
  const { booksData, booksLoading } = useBookContext();

  const [ searchParams, setSearchParams ] = useSearchParams();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const genreParams = searchParams.get('genre');
  const bindingParams = searchParams.get('binding');

  const selectedGenres = genreParams ? genreParams.split('_') : [];
  const selectedBindings = bindingParams ? bindingParams.split('_') : [];

  const booksForPriceFilter = booksData.filter((book) => {
    const genreMatches = (selectedGenres.length === 0 || 
      selectedGenres.some((genre) => book.genres.includes(genre)));

    const bindingMatches = (selectedBindings.length === 0 || 
      selectedBindings.some((binding) => book.format === binding));

    return (genreMatches && bindingMatches); 
  });

  const sellingPrices = booksForPriceFilter.map((book) => {
    return Math.round(book.originalPrice - (book.originalPrice * book.discountPercentage) / 100);
  });

  console.log(sellingPrices);

  const maximumPrice = sellingPrices.length > 0 ? Math.max(...sellingPrices) : 0;

  console.log(maximumPrice);

  useEffect(() => {
    if(maximumPrice === 0) {
      setMinPrice(0);
      setMaxPrice(0);
      return;
    }

    const currentPrice = searchParams.get('price');

    if(currentPrice) {
      const [urlMin, urlMax] = currentPrice.split('-').map(Number);

      const validUrlPrice = Number.isFinite(urlMin) && Number.isFinite(urlMax) && urlMin >=0 && urlMin <= urlMax && urlMax <= maximumPrice;

      if(validUrlPrice) {
        setMinPrice(urlMin);
        setMaxPrice(urlMax);
        return;
      }
    }
    setMinPrice(0)
    setMaxPrice(maximumPrice);
    
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set('price', `0-${maximumPrice}`);

    setSearchParams(updatedParams)
  }, [maximumPrice]);

  const handleMinPrice = (event) => {
    const newMinPrice = Number(event.target.value);

    if(newMinPrice < 0 || newMinPrice > maximumPrice) {
      return;
    }

    if(newMinPrice <= maxPrice) {
      setMinPrice(newMinPrice);

      const updatedParams = new URLSearchParams(searchParams);

      updatedParams.set("price", `${newMinPrice}-${maxPrice}`);

      setSearchParams(updatedParams);
    }

  };

  const handleMaxPrice = (event) => {
    const newMaxPrice = Number(event.target.value);

    if(newMaxPrice < 0 || newMaxPrice > maximumPrice) {
      return; 
    }

    if(newMaxPrice >= minPrice) {
      setMaxPrice(newMaxPrice);

      const updatedParams = new URLSearchParams(searchParams);

      updatedParams.set("price", `${minPrice}-${newMaxPrice}`);

      setSearchParams(updatedParams);
     }
  };


  if(booksLoading) {
    return <p>Loading...</p>
  } 
  
  if(booksData.length === 0) {
    return <p>No Books found</p>
  }

  if(booksForPriceFilter.length === 0) {
    return (
      <p>No books available for the selected filters.</p>
    );
  }

  const minPosition = minPrice / maximumPrice * 100;
  const maxPosition = maxPrice / maximumPrice * 100;
  
  return (
    <div>
      <div>
        <div className='price-slider'>
          <div className="price-slider-track"></div>

          <div className='price-slider-range' style={{left: `${minPosition}%`, width: `${maxPosition - minPosition}%`, }} ></div>

          <input type='range' min='0' max={maximumPrice} value={minPrice} onChange={handleMinPrice} />{' '}

          <input type='range' min='0' max={maximumPrice} value={maxPrice} onChange={handleMaxPrice} />   
        </div>
        <br />
        <div className='d-flex align-items-center gap-2'>
          <input type='number' min='0' max={maxPrice} value={minPrice} onChange={handleMinPrice} className='form-control'/>{' '}<span> - </span>
          <input type='number' min={minPrice} max={maximumPrice} value={maxPrice} onChange={handleMaxPrice} className='form-control' />
        </div>
      </div>
     </div>
  )
}

  
  const BindingFilter = () => {
    const bindings = ['Paperback', 'Hardcover', 'Ebook'];
    const [searchParams, setSearchParams] = useSearchParams();

    const bindingParams = searchParams.get('binding');
    const selectedBinding = bindingParams ? bindingParams.split('_') : [];

    const handleBindingChange = (binding, isChecked) => {
      if(isChecked && !selectedBinding.includes(binding)) {
        const updatedBinding = [...selectedBinding, binding];
        searchParams.set('binding', updatedBinding.join('_'));
      } else {
        const updatedBinding = selectedBinding.filter((b) => b != binding);

        if(updatedBinding.length === 0) {
          searchParams.delete('binding');
        } else {
          searchParams.set('binding', updatedBinding.join('_'));
        }
      }
      setSearchParams(searchParams);
    }

  return (
    <div>
      {bindings.map((binding) => (
        <div key={binding}>
          <input 
            type='checkbox' 
            checked={selectedBinding.includes(binding)} 
            id={binding}
            onChange={(event) => handleBindingChange(binding, event.target.checked)} 
          /> {' '}

          <label htmlFor={binding}>{binding}</label>
        </div>
      ))}    
    </div>
  );
}

const RatingFilter = () => {
  const ratings = [4.0, 3.0, 2.0, 1.0];
  const [searchParams, setSearchParams] = useSearchParams();

  const ratingParam = searchParams.get('rating');

  const handleRatingChange = (rating, isChecked) => {
    if(isChecked) {
      searchParams.set('rating', `${rating}stars_plus`);
    }

    setSearchParams(searchParams);
  }

  return (
    <div>
      {ratings.map((rating) => (
        <div key={rating}>
          <input type='radio' 
          name='rating' 
          checked={ratingParam === `${rating}stars_plus`} 
          id={rating} onChange={(event) => 
          handleRatingChange(rating, event.target.checked)} 
          /> {' '}
          <label htmlFor={rating}>{rating} Stars & above</label>
        </div>
      ))}
    </div>
  );
}

const FilterSection = ({title, isOpen, onToggle, children}) => {
  return (
    <div className='mb-3'>
      <div className='d-flex justify-content-between' onClick={onToggle}>
        <h5>{title}</h5>
        <span>{isOpen ? "⌄" : ">"}</span>
      </div>
      {isOpen && children}
    </div>
  );
}

function FilterSideBar() {
  const [openSection, setOpenSection] = useState({
    genre: true,
    price: false,
    binding: false, 
    rating: false
  });

  const { genreData, genreLoading, genreError } = useBookContext();

  const toggleSection = (section) => {
    setOpenSection((prev) => ({
      ...prev, 
      [section]: !prev[section]
    }));
  }

  return (
    <>
      <FilterSection title="Genre" isOpen={openSection.genre} onToggle={() => toggleSection('genre')}>
        <GenreFilter genres={genreData} />
      </FilterSection>

      <FilterSection title="Price" isOpen={openSection.price} onToggle={() => toggleSection('price')}>
        <PriceFilter />
      </FilterSection>

      <FilterSection title="Binding" isOpen={openSection.binding} onToggle={() => toggleSection('binding')}>
        <BindingFilter />
      </FilterSection>

      <FilterSection title="Rating" isOpen={openSection.rating} onToggle={() => toggleSection('rating')}>
        <RatingFilter />
      </FilterSection>
    </>
  );
}

export default function Books() {
  const { booksData, booksLoading, booksError } = useBookContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const genreParams = searchParams.get('genre');
  const bindingParams = searchParams.get('binding');
  const ratingParams = searchParams.get('rating');

  const selectedGenres = genreParams ? genreParams.split('_') : [];
  const selectedBindings = bindingParams ? bindingParams.split('_') : [];
  const selectedRating = ratingParams ? Number(ratingParams.slice(0, 1)) : '';

  const filteredBooks = booksData.filter((book) => {
    const matchGenres = selectedGenres.length === 0 || 
    selectedGenres.some((genre) => book.genres.includes(genre));

    const matchBindings = selectedBindings.length === 0 || 
    selectedBindings.some((binding) => book.format.includes(binding));

    const matchRatings = selectedRating === '' || book.rating >= selectedRating;

    return matchGenres && matchBindings && matchRatings;
  });

  // console.log(booksData);
  // console.log(booksData.length);
  // console.log(booksLoading);

  // console.log(filteredBooks);

  const sortBy = searchParams.get('sort') || '';

  const calculateSellingPrice = (a) => {
    return Math.round(a.originalPrice - (a.originalPrice * a.discountPercentage) / 100);
  }

  const applySorting = (sortBy) => {
    if(sortBy === 'price-high-low') {
      const sortedBooks = [...filteredBooks].sort((a, b) => {
        const aSP = calculateSellingPrice(a);
        const bSP = calculateSellingPrice(b);

        return bSP - aSP;
      });
      return sortedBooks;
    } else if(sortBy === 'price-low-high') {
      const sortedBooks = [...filteredBooks].sort((a, b) => {
        const aSP = calculateSellingPrice(a);
        const bSP = calculateSellingPrice(b);

        return aSP - bSP;
      });
      return sortedBooks;
    } else if(sortBy == 'date-old-new') {
      const sortedBooks = [...filteredBooks].sort((a, b) => {
        const aDate = new Date(a.publishedDate);
        const bDate = new Date(b.publishedDate);

        return aDate - bDate;
      });

      return sortedBooks;
    } else if(sortBy == 'date-new-old') {
      const sortedBooks = [...filteredBooks].sort((a, b) => {
        const aDate = new Date(a.publishedDate);
        const bDate = new Date(b.publishedDate);

        return bDate - aDate;
      });

      return sortedBooks;
    }
    else if(sortBy == 'newArrival') {
        const newArrivalBooks = filteredBooks.filter((book) => new Date(book.publishedDate).getFullYear() > 2016)
        const sortedBooks = [...newArrivalBooks].sort((a, b) => {
        const aDate = new Date(a.publishedDate);
        const bDate = new Date(b.publishedDate);

        return bDate - aDate;
      });

      return sortedBooks;
    }
    else if(sortBy == 'deals') {
        const DiscountedBooks = filteredBooks.filter((book) => book.discountPercentage >= 25)
        const sortedBooks = [...DiscountedBooks].sort((a, b) => b.discountPercentage - a.discountPercentage);

      return sortedBooks;
    }
  }

  const sortedBooks = sortBy ? applySorting(sortBy) : filteredBooks;

  const handleSortChange = (event) => {
    const sortByValue = event.target.value;
    // console.log(sortByValue);
    if(sortByValue) {
      searchParams.set('sort', sortByValue);
    } else {
      searchParams.delete('sort');
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="bg-warning-subtle">
      <div className="container-fluid">
        <div className="text-center bg-warning text-light py-3">{selectedGenres.length === 0 ? <h1>All Books</h1> : <h1>{selectedGenres.join(', ')}</h1>}</div>

        <div className='py-3 text-center'>
          <select className='form-control' onChange={handleSortChange} value={sortBy}>
            <option value=''>Sort By</option>
            <option value='price-low-high'>Price Low to High</option>
            <option value='price-high-low'>Price High to Low</option>
            <option value='date-old-new'>Date - Old to New</option>
            <option value='date-new-old'>Date - New to Old</option>
            <option value='deals'>Today's Deals</option>
            <option value='newArrival'>New Arrival</option>
          </select>
        </div>
        
        <div className="row g-1">
          <div className="col-md-2">
            <div className='card'>
              <div className='card-body'>
                <h5 className='text-center'>Filters</h5>
                <FilterSideBar />
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row g-3">
              {sortedBooks.map((book) => 
                <div key={book._id} className='col-md-3'>
                  <BookCard book={book} id={book._id} />
                </div>  
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
