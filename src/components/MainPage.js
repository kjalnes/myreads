import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from './Shelf';

class MainPage extends Component {


    sortBooks = (books) => {
        let currentlyReading = {title: 'Currently Reading', books: []};
        let wantToRead = {title: 'Want to Read', books:[]};
        let read = {title: 'Read', books:[]};

        books.forEach( book => {
            if(book.shelf === 'currentlyReading') {
                 currentlyReading.books.push(book);
            } else if (book.shelf === 'wantToRead') {
                 wantToRead.books.push(book)
            } else if ( book.shelf === 'read') {
                 read.books.push(book)
            }
        })

        return [currentlyReading, wantToRead, read];
    }

    render() {

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    {
                        this.sortBooks(this.props.books).map( category => (
                            <Shelf
                                title={category.title}
                                books={category.books} />)
                        )
                    }
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                        >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MainPage;
