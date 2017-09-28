import React from 'react';
import Book from './Book';

const Books = ({books, updateBook}) => (
    <ol className="books-grid">
        {
            books && books.length ? books.map( (_book, index) => (
                <Book
                    key={index}
                    book={_book}
                    updateBook={updateBook}/>
            )) : ''
        }
    </ol>
)


export default Books;
