import { toast } from "react-toastify";

const WishlistButton = ({ book, addToWishlist, removeFromWishlist, isInWishlist }) => {

    const handleWishlistToggle = async () => {
        let result;
        const alreadyInWishlist = isInWishlist(book._id);

        if (alreadyInWishlist) {
            result = await removeFromWishlist(book._id);
        } else {
            result = await addToWishlist(book);
        }

        if (result) {
            if(alreadyInWishlist) {
                toast.success("Book removed from the wishlist successfully.");
            } else {
                toast.success("Book added to the wishlist successfully.")
            }
        } else {
            toast.error("Unable to update your wishlist. Please try again.");
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