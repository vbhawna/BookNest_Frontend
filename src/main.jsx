import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BookProvider from './contexts/BookContext';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
            /> 
          </CartProvider>
        </WishlistProvider>
      </BookProvider>
    </BrowserRouter>
  </StrictMode>
);
