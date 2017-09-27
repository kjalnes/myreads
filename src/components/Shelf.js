import React from 'react';
import Book from './Book';
import Spinner from './Spinner';

const Shelf = ({title, books}) => {

    return books !== undefined ? (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books.map( _book => <Book book={_book} />)
                }
            </ol>
          </div>
        </div>
    ) : <Spinner />
}

export default Shelf;
