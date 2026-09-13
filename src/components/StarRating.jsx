import { FaStar, FaStarHalfStroke, FaRegStar } from 'react-icons/fa6';

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStarts = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="text-warning">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}

      {halfStar && <FaStarHalfStroke />}

      {[
        ...Array(emptyStarts).map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        )),
      ]}
    </div>
  );
}