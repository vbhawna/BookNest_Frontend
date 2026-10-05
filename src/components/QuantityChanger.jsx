import { useCartContext } from "../contexts/CartContext";

export default function QuantityChanger({item}) {
    const { updatedCartQuantity } = useCartContext();

    return (
        <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={item.quantity === 1}
                        onClick={() =>
                            updatedCartQuantity(
                                item.book._id,
                                "decrease"
                            )
                        }
                      >
                          -
                      </button>

                            <span className="btn btn-outline-secondary">
                                {item.quantity}
                            </span>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={item.quantity === item.book.stockQuantity}
                                onClick={() =>
                                    updatedCartQuantity(
                                        item.book._id,
                                        "increase"
                                    )
                                }
                            >
                                +
                            </button>
                    </div>
    );
}