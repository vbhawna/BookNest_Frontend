import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import BookDetails from './pages/BookDetails';
import Footer from './components/Footer';


export default function App() {
  return (
    <div className='bg-warning-subtle min-vh-100'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
