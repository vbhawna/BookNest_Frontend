export const calculateItemPrice = (originalPrice, discountPercentage) => {
    return Math.round(
        originalPrice - (originalPrice * discountPercentage) / 100
    );
};

export const calculateDiscountAmount = (originalPrice, discountPercentage) => {
    return (originalPrice 
        - calculateItemPrice(originalPrice, discountPercentage));
};

export const calculateTotalOriginalPrice = (items) => {
    return items.reduce((total, item) => {
        return total + (item.book.originalPrice * item.quantity);
    }, 0);
};

export const calculateTotalDiscount = (items) => {
    return items.reduce((total, item) => {
        return total + item.quantity * (calculateDiscountAmount(item.book.originalPrice, item.book.discountPercentage));
    }, 0);
};

export const calculateDeliveryCharge = (items) => {
    return (calculateTotalOriginalPrice(items) - calculateTotalDiscount(items)) >= 500 ? 0 : 50;
};

export const calculateTotalPrice = (items) => {
    return calculateTotalOriginalPrice(items) - calculateTotalDiscount(items) + calculateDeliveryCharge(items);
};

export const calculateTotalItems = (items) => {
    return items.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
};