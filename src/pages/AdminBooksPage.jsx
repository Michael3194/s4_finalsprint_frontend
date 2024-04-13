import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminBooksPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedBookId, setEditedBookId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

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
        // Handle error, e.g., redirect to login page
        navigate('/');
      }
    };

    if (user && user.role === 'ADMIN') {
      fetchBooks();
    } else {
      // Redirect to login page if user is not authenticated or not an admin
      navigate('/');
    }
  }, [user, navigate]);

  const handleEditTitle = async (bookId) => {
    try {
      const bookToUpdate = books.find((book) => book.id === bookId);
      const updatedBook = {
        ...bookToUpdate,
        title: editedTitle,
      };

      await axios.put(`http://localhost:8080/book/${bookId}`, updatedBook);
      setBooks((prevBooks) => {
        return prevBooks.map((book) => {
          if (book.id === bookId) {
            return {
              ...book,
              title: editedTitle,
            };
          }
          return book;
        });
      });
    } catch (error) {
      console.error('Error updating book title:', error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div>
      <h1 className='heading'>Admin Books Page</h1>
      {books.map((book) => (
        <div
          key={book.id}
          className='book-card'
        >
          <div className='book-info'>
            <div className='book-title'>
              <h2>{book.title}</h2>
              <button onClick={() => setEditedBookId(book.id)}>Edit</button>
            </div>
            <p>Author: {book.author.firstName + ' ' + book.author.lastName}</p>
            <p>Genre: {book.genre.name}</p>
            <p>Page Count: {book.pageCount}</p>
            {/* Add more book details as needed */}
          </div>
          {editedBookId === book.id && (
            <div className='edit-book-form'>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <button onClick={() => handleEditTitle(book.id)}>Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminBooksPage;
