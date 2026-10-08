import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const {
        data: cartData, 
        loading: cartLoading,
        error: cartError,
    } = useFetch("https://book-nest-project1.vercel.app/cart?userId=6ab11de1bb78294b172bd040");

    // console.log("DB Cart-", cartData);

    useEffect(() => {
        if(cartData?.cart) {
            setCart(cartData.cart);
        }
    }, [cartData]);

    console.log("Local Cart", cart);

    const isInCart = (bookId) => {
        if(cart !== null) {
            return cart.items.some(
                (item) => item.book._id === bookId
            );
        }

        return false;
    };

    const addToCart = async (bookId) => {
        if(!cart) {
            return false;
        }

        try {
            const response = await fetch("https://book-nest-project1.vercel.app/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "6ab11de1bb78294b172bd040",
                    bookId: bookId,
                }),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to add book in cart");
            }

            setCart(data.cart);

            return true;
        } catch(error) {
            console.error("Failed to add book to cart: ", error);
            return false;
        }
    };

    const updatedCartQuantity = async (bookId, operation) => {
        try {
            const response = await fetch(`https://book-nest-project1.vercel.app/cart/${bookId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "6ab11de1bb78294b172bd040",
                    operation: operation,
                }),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to update item quantity in the cart.");
            }

            setCart(data.cart);

            return true;
        } catch(error) {
            console.error("Error while updating item quantity in the cart: ", error);
            return false;
        }
    };

    const removeFromCart = async (bookId) => {

        try {
            const response = await fetch(`https://book-nest-project1.vercel.app/cart/${bookId}?userId=6ab11de1bb78294b172bd040`, {
                method: "DELETE",
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to remove book from cart.");
            }

            setCart(data.cart);

            return true;

        } catch(error) {
            console.error("Failed to remove book from the cart: ", error);
            return false;
        }
    }

    const clearCart = () => {
        setCart((prevCart) => ({
            ...prevCart,
            items: [],
        }));
    };

    return (
        <CartContext.Provider value={{
            cart, 
            cartLoading,
            cartError,
            isInCart,
            addToCart,
            removeFromCart, 
            updatedCartQuantity,
            clearCart,
        }} >
            {children}
        </CartContext.Provider>
    );
};