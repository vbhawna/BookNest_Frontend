import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const WishlistContext = createContext();
export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(null);

    const {
        data: wishlistData,
        loading: wishlistLoading,
        error: wishlistError,
    } = useFetch("https://book-nest-project1.vercel.app/wishlist?userId=6ab11de1bb78294b172bd040");
    
    console.log(wishlist);

    useEffect(() => {
        if(wishlistData?.wishlist) {
            setWishlist(wishlistData.wishlist);
        }
    }, [wishlistData]);
    
    const isInWishlist = (bookId) => {
        if(wishlist !== null) {
            return wishlist.books.some((book) => book._id === bookId);
        }

        return false;
    };

    const addToWishlist = async (book) => {
        if(!wishlist) {
            return false;
        }
        console.time("wishlist-add");

        const previousWishlist = wishlist;

        const updatedWishlist = {
            ...wishlist,
            books: [...wishlist.books, book],
        };

        setWishlist(updatedWishlist);

        try {
            const response = await fetch("https://book-nest-project1.vercel.app/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "6ab11de1bb78294b172bd040",
                    bookId: book._id,
                }),
            });

            const data = await response.json();
            

            if(!response.ok) {
                throw new Error(data.message || "Failed to add wishlist");
            }

            //We will update local wishlist here.
            console.timeEnd("wishlist-add");
            setWishlist(data.wishlist);
            return true;
        } catch(error) {
            console.timeEnd("wishlist-add");
            setWishlist(previousWishlist);
            console.error("Failed to add book to wishlish.: ", error);
            return false;
        }
    };

    const removeFromWishlist = async (bookId) => {
        if(!wishlist) {
            return false;
        }
        
        const previousWishlist = wishlist;

        const updatedWishlist = {
            ...wishlist,
            books: wishlist.books.filter((book) => book._id !== bookId),
        };

        setWishlist(updatedWishlist);

        try {
                const response = await fetch(
                    `https://book-nest-project1.vercel.app/wishlist/${bookId}?userId=6ab11de1bb78294b172bd040`, 
                    {
                        method: "DELETE",
                    },
                );

                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data.message || "Failed to remove book from wishlist");
                }

                setWishlist(data.wishlist);

                return true;
            } catch(error) {
                setWishlist(previousWishlist);
                console.error("Failed to remove book from wishlist: ", error);
                return false;
            }
    };

    return (
        <WishlistContext.Provider value={{
            wishlistData, 
            wishlistLoading,
            wishlistError,
            isInWishlist,
            addToWishlist,
            removeFromWishlist,
            wishlist,
        }} >
            {children}
        </WishlistContext.Provider>
    );
};