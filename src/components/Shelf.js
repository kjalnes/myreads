import React from 'react';
import Books from './Books';

const Shelf = ({title, books, updateBook}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <Books books={books} updateBook={updateBook} />
        </div>
    </div>
)


export default Shelf;
