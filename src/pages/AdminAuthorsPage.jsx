// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminAuthorsPage = () => {
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingAuthorId, setEditingAuthorId] = useState(null);
//   const [editingField, setEditingField] = useState(null);
//   const [updatedFirstName, setUpdatedFirstName] = useState('');
//   const [updatedLastName, setUpdatedLastName] = useState('');

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/author');
//         setAuthors(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchAuthors();
//   }, []);

//   const handleEdit = (authorId, field) => {
//     setEditingAuthorId(authorId);
//     setEditingField(field);
//     const authorToEdit = authors.find((author) => author.id === authorId);
//     if (field === 'firstName') {
//       setUpdatedFirstName(authorToEdit.firstName);
//       setUpdatedLastName(authorToEdit.lastName);
//     } else {
//       setUpdatedFirstName(authorToEdit.firstName);
//       setUpdatedLastName(authorToEdit.lastName);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const updatedAuthor = {
//         id: editingAuthorId,
//         firstName: updatedFirstName,
//         lastName: updatedLastName,
//       };
//       await axios.put(
//         `http://localhost:8080/author/${editingAuthorId}`,
//         updatedAuthor
//       );
//       const updatedAuthors = authors.map((author) => {
//         if (author.id === editingAuthorId) {
//           return {
//             ...author,
//             firstName: updatedFirstName,
//             lastName: updatedLastName,
//           };
//         }
//         return author;
//       });
//       setAuthors(updatedAuthors);
//       setEditingAuthorId(null);
//       setEditingField(null);
//     } catch (error) {
//       console.error('Error updating author:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1 className='heading'>Admin Authors Page</h1>
//       {authors.map((author) => (
//         <div
//           key={author.id}
//           className='book-card'
//         >
//           <h2>First Name: {author.firstName}</h2>
//           <h2>Last Name: {author.lastName}</h2>
//           <div>
//             <button onClick={() => handleEdit(author.id, 'firstName')}>
//               Edit First Name
//             </button>
//             <button onClick={() => handleEdit(author.id, 'lastName')}>
//               Edit Last Name
//             </button>
//           </div>
//           {editingAuthorId === author.id && (
//             <div>
//               <input
//                 type='text'
//                 value={
//                   editingField === 'firstName'
//                     ? updatedFirstName
//                     : updatedLastName
//                 }
//                 onChange={(e) =>
//                   editingField === 'firstName'
//                     ? setUpdatedFirstName(e.target.value)
//                     : setUpdatedLastName(e.target.value)
//                 }
//               />
//               <button onClick={handleSubmit}>Submit</button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminAuthorsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAuthorId, setEditingAuthorId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/author');
        setAuthors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleEdit = (authorId, field) => {
    setEditingAuthorId(authorId);
    setEditingField(field);
    const authorToEdit = authors.find((author) => author.id === authorId);
    if (field === 'firstName') {
      setUpdatedFirstName(authorToEdit.firstName);
      setUpdatedLastName(authorToEdit.lastName);
    } else {
      setUpdatedFirstName(authorToEdit.firstName);
      setUpdatedLastName(authorToEdit.lastName);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAuthor = {
        id: editingAuthorId,
        firstName: updatedFirstName,
        lastName: updatedLastName,
      };
      await axios.put(
        `http://localhost:8080/author/${editingAuthorId}`,
        updatedAuthor
      );
      const updatedAuthors = authors.map((author) => {
        if (author.id === editingAuthorId) {
          return {
            ...author,
            firstName: updatedFirstName,
            lastName: updatedLastName,
          };
        }
        return author;
      });
      setAuthors(updatedAuthors);
      setEditingAuthorId(null);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`http://localhost:8080/author/${authorId}`);
      const updatedAuthors = authors.filter((author) => author.id !== authorId);
      setAuthors(updatedAuthors);
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className='heading'>Admin Authors Page</h1>
      {authors.map((author) => (
        <div
          key={author.id}
          className='book-card'
        >
          <h2>First Name: {author.firstName}</h2>
          <h2>Last Name: {author.lastName}</h2>
          <div>
            <button onClick={() => handleEdit(author.id, 'firstName')}>
              Edit First Name
            </button>
            <button onClick={() => handleEdit(author.id, 'lastName')}>
              Edit Last Name
            </button>
            <button onClick={() => handleDelete(author.id)}>
              Delete Author
            </button>
          </div>
          {editingAuthorId === author.id && (
            <div>
              <input
                type='text'
                value={
                  editingField === 'firstName'
                    ? updatedFirstName
                    : updatedLastName
                }
                onChange={(e) =>
                  editingField === 'firstName'
                    ? setUpdatedFirstName(e.target.value)
                    : setUpdatedLastName(e.target.value)
                }
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminAuthorsPage;
