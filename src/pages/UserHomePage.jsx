import { useState, useEffect } from 'react';
import axios from 'axios';
import UserNav from '../components/UserNav';

const UserHomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/books');
        const booksData = response.data;

        // For each book, fetch the author and genre details
        const booksWithDetails = await Promise.all(
          booksData.map(async (book) => {
            const authorResponse = await axios.get(
              `http://localhost:8080/author/${book.authorId}`
            );
            const authorData = authorResponse.data;

            const genreResponse = await axios.get(
              `http://localhost:8080/genre/${book.genreId}`
            );
            const genreData = genreResponse.data;

            return {
              ...book,
              author: authorData,
              genre: genreData,
            };
          })
        );

        setBooks(booksWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <UserNav />
      <h1 className='heading'>User Home Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {books.map((book) => (
            <div
              key={book.id}
              className='book-card'
            >
              <div className='book-info'>
                <div className='book-title'>
                  <h2>{book.title}</h2>
                </div>
                <p>
                  Author: {book.author.firstName + ' ' + book.author.lastName}
                </p>
                <p>Genre: {book.genre.name}</p>
                <p>Page Count: {book.pageCount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHomePage;
