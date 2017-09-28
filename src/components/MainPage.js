import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

const MainPage = ({books, updateBook}) => {

    const sortBooks = (books) => {
        let categories = {
            currentlyReading: { title: 'Currently Reading', books: [] },
            wantToRead: { title: 'Want to Read', books:[] },
            read: { title: 'Read', books:[] }
        }

        books.forEach( book => categories[book.shelf].books.push(book));
        return [categories.currentlyReading, categories.wantToRead, categories.read];
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {sortBooks(books).map( (category, index) => (
                        <Shelf
                            key={index}
                            title={category.title}
                            books={category.books}
                            updateBook={updateBook} /> ))
                    }
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
}

export default MainPage;
