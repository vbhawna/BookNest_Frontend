import { FaStar, FaStarHalfStroke, FaRegStar } from 'react-icons/fa6';

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="star-rating text-warning d-flex align-items-center flex-nowrap flex-shrink-0">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}

      {halfStar && <FaStarHalfStroke />}

      {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        ))}
    </div>
  );
}