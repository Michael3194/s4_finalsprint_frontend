const BookCard = ({ book, handleEditTitle }) => {
  return (
    <div className='book-card'>
      <h2>{book.title}</h2>
      <p>
        Author:{' '}
        {book.author
          ? `${book.author.firstName} ${book.author.lastName}`
          : 'Unknown'}
      </p>
      <p>Genre: {book.genre.name}</p>
      <p>Page Count: {book.pageCount}</p>
      <button onClick={() => handleEditTitle(book.id)}>Edit Title</button>
    </div>
  );
};

export default BookCard;
