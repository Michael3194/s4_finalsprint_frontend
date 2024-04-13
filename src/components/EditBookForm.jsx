import React, { useState } from 'react';

const EditBookForm = ({ book, handleEditPageCount }) => {
  const [newPageCount, setNewPageCount] = useState(book.pageCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPageCount(book.id, newPageCount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>New Page Count:</label>
      <input
        type='number'
        value={newPageCount}
        onChange={(e) => setNewPageCount(e.target.value)}
        required
      />
      <button type='submit'>Save</button>
    </form>
  );
};

export default EditBookForm;
