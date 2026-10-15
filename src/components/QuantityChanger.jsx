
import { useState } from "react";
import { toast } from "react-toastify";
import { useCartContext } from "../contexts/CartContext";

export default function QuantityChanger({ item }) {
  const { updatedCartQuantity } = useCartContext();
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (operation) => {
    if (updating) return;

    if (operation === "decrease" && item.quantity <= 1) {
      toast.info("Quantity cannot be less than 1.");
      return;
    }

    if (
      operation === "increase" &&
      item.quantity >= item.book.stockQuantity
    ) {
      toast.info("You cannot add more than the available stock.");
      return;
    }

    setUpdating(true);

    try {
      const success = await updatedCartQuantity(
        item.book._id,
        operation
      );

      if (success) {
        toast.success(
          operation === "increase"
            ? "Book quantity increased."
            : "Book quantity decreased."
        );
      } else {
        toast.error("Unable to update quantity. Please try again.");
      }
    } catch {
      toast.error("Something went wrong while updating quantity.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="btn-group" role="group" aria-label="Book quantity">
      <button
        type="button"
        className="btn btn-outline-secondary"
        disabled={updating || item.quantity <= 1}
        onClick={() => handleQuantityChange("decrease")}
        aria-label="Decrease quantity"
      >
        {updating ? (
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
        ) : (
          "−"
        )}
      </button>

      <span
        className="btn btn-outline-secondary bg-white text-dark"
        aria-live="polite"
      >
        {item.quantity}
      </span>

      <button
        type="button"
        className="btn btn-outline-secondary"
        disabled={
          updating || item.quantity >= item.book.stockQuantity
        }
        onClick={() => handleQuantityChange("increase")}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
