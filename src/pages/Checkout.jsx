import { useState } from "react";
import useFetch from "../useFetch";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import {
  calculateDeliveryCharge,
  calculateItemPrice,
  calculateTotalDiscount,
  calculateTotalItems,
  calculateTotalOriginalPrice,
  calculateTotalPrice,
} from "../utils/cartCalculations";

export default function Checkout() {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const userId = "6ab11de1bb78294b172bd040";

  const navigate = useNavigate();

  const {
    data: addressData,
    loading: addressLoading,
    error: addressError,
  } = useFetch(
    `https://book-nest-project1.vercel.app/addresses?userId=${userId}`
  );

  const {
    cart,
    cartLoading,
    cartError,
    clearCart,
  } = useCartContext();

  if (addressLoading) {
    return (
      <div className="container min-vh-100 text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="text-muted mt-3">
          Loading your addresses...
        </p>
      </div>
    );
  }

  if (addressError) {
    return (
      <div className="container min-vh-100 text-center py-5">
        <p className="text-danger">
          Something went wrong while loading your addresses...
        </p>
      </div>
    );
  }

  if (cartLoading) {
    return (
      <div className="container min-vh-100 text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="text-muted mt-3">
          Loading your cart items...
        </p>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="container min-vh-100 text-center py-5">
        <p className="text-danger">
          Something went wrong while loading your cart...
        </p>
      </div>
    );
  }

  if (!cart || (cart.items.length === 0 && !orderSuccess)) {
    return (
      <div className="container min-vh-100 text-center py-5">

        <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body py-5">

            <h2 className="mb-3">
              Your Cart is Empty
            </h2>

            <p className="text-muted mb-4">
              Add some books to your cart before proceeding to checkout.
            </p>

            <Link
              to="/books"
              className="btn btn-outline-secondary px-4"
            >
              Shop Now
            </Link>

          </div>
        </div>

      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      if (!selectedAddressId) {
        window.alert("Please select a delivery address.");
        return;
      }

      const response = await fetch(
        "https://book-nest-project1.vercel.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            addressId: selectedAddressId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Error occurred while creating new order."
        );
      }

      console.log("Data after placing Order: ", data);

      clearCart();

      setOrderSuccess(data.order);

      console.log("Order Details", orderSuccess);
    } catch (error) {
      console.error(
        "Error while creating new order:",
        error
      );
    }
  };

  return (
    <div className="container py-4">

      {/* Page Heading */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Checkout
        </h2>

        <p className="text-muted mb-0">
          Review your order and select a delivery address.
        </p>
      </div>


      <div className="row g-4">

        {/* LEFT COLUMN */}

        <div className="col-lg-8">

          {/* Delivery Address */}
          <div className="card border-0 shadow-sm mb-4">

            <div className="card-header bg-white border-bottom py-3">
              <h4 className="mb-0">
                Select Delivery Address
              </h4>
            </div>

            <div className="card-body">

              {addressData?.addresses?.length === 0 ? (

                <div className="text-center py-4">

                  <p className="text-muted mb-3">
                    No saved addresses.
                  </p>

                  <Link
                    to="/profile"
                    className="btn btn-outline-secondary px-4"
                  >
                    + Add New Address
                  </Link>

                </div>

              ) : (

                <div className="row g-3">

                  {addressData?.addresses?.map((address) => (

                    <div
                      className="col-md-6"
                      key={address._id}
                    >

                      <div
                        className={`card h-100 ${
                          selectedAddressId === address._id
                            ? "border-dark shadow-sm"
                            : "border"
                        }`}
                      >

                        <div className="card-body">

                          <div className="d-flex justify-content-between align-items-start mb-3">

                            <div className="d-flex align-items-center gap-2">

                              <input
                                type="radio"
                                className="form-check-input mt-0"
                                name="address"
                                checked={
                                  selectedAddressId === address._id
                                }
                                onChange={() =>
                                  setSelectedAddressId(address._id)
                                }
                              />

                              <h5 className="mb-0">
                                {address.fullName}
                              </h5>

                            </div>

                            <span className="badge text-bg-secondary">
                              {address.addressType}
                            </span>

                          </div>

                          <p className="mb-1 text-muted">
                            {address.houseNumber},{" "}
                            {address.street}
                          </p>

                          <p className="mb-1 text-muted">
                            {address.city},{" "}
                            {address.state}
                          </p>

                          <p className="mb-1 text-muted">
                            {address.country} -{" "}
                            {address.pincode}
                          </p>

                          <p className="mb-0 text-muted">
                            Phone: {address.phoneNumber}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>


          {/* Order Items */}
          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white border-bottom py-3">

              <div className="d-flex justify-content-between align-items-center">

                <h4 className="mb-0">
                  Order Summary
                </h4>

                <span className="badge text-bg-light">
                  {calculateTotalItems(cart.items)}{" "}
                  {calculateTotalItems(cart.items) === 1 ? "Book" : "Books"}
                </span>

              </div>

            </div>


            <div className="card-body">

              {cart.items.map((item) => (

                <div
                  key={item.book._id}
                  className="d-flex align-items-center border-bottom pb-3 mb-3"
                >

                  {/* Book Image */}
                  <div
                    className="me-3 bg-light rounded d-flex align-items-center justify-content-center"
                    style={{
                      width: "90px",
                      height: "110px",
                    }}
                  >

                    <img
                      src={item.book.coverImageUrl}
                      alt={item.book.title}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />

                  </div>


                  {/* Book Information */}
                  <div className="flex-grow-1">

                    <h5 className="mb-2">
                      {item.book.title}
                    </h5>

                    <p className="small text-muted mb-1">
                      MRP: ₹{item.book.originalPrice}
                    </p>

                    <p className="small text-muted mb-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mb-0 fw-semibold">
                      Price: ₹
                      {calculateItemPrice(
                        item.book.originalPrice,
                        item.book.discountPercentage
                      )}
                    </p>

                  </div>


                  {/* Item Total */}
                  <div className="text-end">

                    <span className="fw-bold">
                      ₹
                      {calculateItemPrice(
                        item.book.originalPrice,
                        item.book.discountPercentage
                      ) * item.quantity}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* RIGHT COLUMN */}

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white border-bottom py-3">

              <h4 className="mb-0">
                Price Details
              </h4>

            </div>


            <div className="card-body">

              {/* Total MRP */}
              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                  Total MRP
                </span>

                <span>
                  ₹{calculateTotalOriginalPrice(cart.items)}
                </span>

              </div>


              {/* Discount */}
              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                  Discount
                </span>

                <span className="text-success">
                  -₹{calculateTotalDiscount(cart.items)}
                </span>

              </div>


              {/* Delivery */}
              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                  Delivery Charge
                </span>

                <span>
                  {calculateDeliveryCharge(cart.items) === 0
                    ? (
                      <span className="text-success">
                        FREE
                      </span>
                    )
                    : (
                      `₹${calculateDeliveryCharge(cart.items)}`
                    )}
                </span>

              </div>


              <hr />


              {/* Total */}
              <div className="d-flex justify-content-between mb-4">

                <span className="fw-bold fs-5">
                  Total Amount
                </span>

                <span className="fw-bold fs-5">
                  ₹{calculateTotalPrice(cart.items)}
                </span>

              </div>


              {/* Selected Address Message */}
              {!selectedAddressId && (
                <div className="alert alert-warning small">
                  Please select a delivery address before placing your order.
                </div>
              )}


              {/* Place Order */}
              <button
                type="button"
                className="btn btn-warning w-100 fw-semibold py-2"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>


              {/* Continue Shopping */}
              <div className="text-center mt-3">

                <Link
                  to="/books"
                  className="small text-decoration-none text-muted"
                >
                  ← Continue Shopping
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

      {orderSuccess && (
        <>
          <div className="modal fade show  d-block" tabIndex="-1" role="dialog">
            
            <div className="modal-dialog modal-dialog-centered">

              <div className="modal-content">

                <div className="modal-header">

                  <h5 className="modal-title text-success">
                    Order Placed Successfully!
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setOrderSuccess(null)}
                    aria-label="Close"
                  />

                </div>

                <div className="modal-body">

                  <div className="text-center mb-4">

                    <div 
                      className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        fontSize: "28px",
                      }}>
                        ✓
                    </div>

                    <h5 className="mb-1">Thank you for your order!</h5>

                    <p className="text-muted small mb-0">
                      Your order has been placed successfully.
                    </p>

                  </div>

                  {/* Short Order Information */}
                  <div className="card bg-light border-0">

                    <div className="card-body">

                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          Order ID
                        </span>

                        <span className="fw-semibold">
                          #{orderSuccess._id.slice(-8)}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          Order Date
                        </span>

                        <span className="fw-semibold">
                          {new Date(orderSuccess.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          Items
                        </span>

                        <span className="fw-semibold">
                          {calculateTotalItems(orderSuccess.items)}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          Status
                        </span>

                        <span className="fw-semibold">
                          {orderSuccess.status}
                        </span>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between fw-bold">
                        <span>
                          Total amount: 
                        </span>

                        <span>
                          ₹{orderSuccess.totalAmount}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setOrderSuccess(null)}
                  >
                    Close
                  </button>

                  <butoon
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {
                      setOrderSuccess(null);
                      navigate("/profile?section=orders");
                    }}
                  >
                    View My Orders
                  </butoon>
                </div>

              </div>

            </div>

          </div>

          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}

    </div>
  );
}