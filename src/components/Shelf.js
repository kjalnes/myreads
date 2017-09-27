import React from 'react';
import Book from './Book';

const Shelf = ({title, books, updateBook}) => {

    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books.map( (_book, index) => (
                        <Book
                            key={index}
                            book={_book}
                            updateBook={updateBook}/>
                    ))
                }
            </ol>
          </div>
        </div>
    )
}

export default Shelf;
