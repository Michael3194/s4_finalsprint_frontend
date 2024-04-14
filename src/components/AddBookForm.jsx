// import { useState } from 'react';
// import axios from 'axios';

// const AddBookForm = ({ onAddBook }) => {
//   const [title, setTitle] = useState('');
//   const [authorId, setAuthorId] = useState('');
//   const [genreId, setGenreId] = useState('');
//   const [pageCount, setPageCount] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/book', {
//         title,
//         authorId,
//         genreId,
//         pageCount,
//       });
//       const newBook = response.data;
//       onAddBook(newBook);
//       // Reset form fields after successful submission
//       setTitle('');
//       setAuthorId('');
//       setGenreId('');
//       setPageCount('');
//     } catch (error) {
//       console.error('Error adding book:', error);
//       // Handle error, e.g., display error message
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Book</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor='title'>Title:</label>
//           <input
//             type='text'
//             id='title'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor='authorId'>Author ID:</label>
//           <input
//             type='text'
//             id='authorId'
//             value={authorId}
//             onChange={(e) => setAuthorId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor='genreId'>Genre ID:</label>
//           <input
//             type='text'
//             id='genreId'
//             value={genreId}
//             onChange={(e) => setGenreId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor='pageCount'>Page Count:</label>
//           <input
//             type='text'
//             id='pageCount'
//             value={pageCount}
//             onChange={(e) => setPageCount(e.target.value)}
//             required
//           />
//         </div>
//         <button type='submit'>Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default AddBookForm;

import { useState } from 'react';
import axios from 'axios';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [pageCount, setPageCount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make POST request to add the book
      const response = await axios.post('http://localhost:8080/book', {
        title,
        authorId,
        genreId,
        pageCount,
      });
      const newBook = response.data;

      // Fetch author details for the newly added book
      const authorResponse = await axios.get(
        `http://localhost:8080/author/${newBook.authorId}`
      );
      const authorData = authorResponse.data;

      // Fetch genre details for the newly added book
      const genreResponse = await axios.get(
        `http://localhost:8080/genre/${newBook.genreId}`
      );
      const genreData = genreResponse.data;

      // Update the author and genre details in the new book object
      const bookWithDetails = {
        ...newBook,
        author: authorData,
        genre: genreData,
      };

      // Pass the new book with details to the parent component
      onAddBook(bookWithDetails);

      // Reset form fields after successful submission
      setTitle('');
      setAuthorId('');
      setGenreId('');
      setPageCount('');
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='authorId'>Author ID:</label>
          <input
            type='text'
            id='authorId'
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='genreId'>Genre ID:</label>
          <input
            type='text'
            id='genreId'
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='pageCount'>Page Count:</label>
          <input
            type='text'
            id='pageCount'
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
