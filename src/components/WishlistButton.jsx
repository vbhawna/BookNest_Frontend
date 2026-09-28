const WishlistButton = ({ book, addToWishlist, removeFromWishlist, isInWishlist }) => {
    const handleWishlistToggle = async () => {
        if(isInWishlist(book._id)) {
        await removeFromWishlist(book._id);
        } else {
        await addToWishlist(book);
        }
    };

    return (
        <button
            type="button"
            className="btn btn-light m-2 rounded-circle shadow-sm text-danger"
            aria-label={
              isInWishlist(book._id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            onClick={handleWishlistToggle}
          >
            {isInWishlist(book._id) ? "♥" : "♡"}
        </button>
    );
};

export default WishlistButton;