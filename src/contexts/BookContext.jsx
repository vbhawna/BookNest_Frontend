import { useState, createContext, useContext } from "react";
import useFetch from '../useFetch';

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export default function BookProvider({ children }) {
  

    const {
    data: genreData,
    loading: genreLoading,
    error: genreError,
  } = useFetch('https://book-nest-project1.vercel.app/genres');

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useFetch('https://book-nest-project1.vercel.app/books');

  return (
    <BookContext.Provider value={{ genreData, genreLoading, genreError, booksData, booksLoading, booksError }}>
        { children }
    </BookContext.Provider>
  );
}