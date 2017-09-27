import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Shelf from './Shelf';


class MainPage extends Component  {
    state = {
        books: [],
        currentlyReading: {},
        wantToRead: {},
        read: {}
    }

    componentDidMount() {
        let currentlyReading = {title: 'Currently Reading', books: []};
        let wantToRead = {title: 'Want to Read', books:[]};
        let read = {title: 'Read', books:[]};

        BooksAPI.getAll()
            .then( books => {
                return books.forEach( book => {
                    if(book.shelf === 'currentlyReading') {
                         currentlyReading.books.push(book);
                    } else if (book.shelf === 'wantToRead') {
                         wantToRead.books.push(book)
                    } else if ( book.shelf === 'read') {
                         read.books.push(book)
                    }
                })
            })
            .then( () => this.setState({currentlyReading, wantToRead, read}))
    }



    render() {
      // console.log('this.props.books',this.props.books)
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf
                            title={this.state.currentlyReading.title}
                            books={this.state.currentlyReading.books} />
                        <Shelf
                            title={this.state.wantToRead.title}
                            books={this.state.wantToRead.books} />
                        <Shelf
                            title={this.state.read.title}
                            books={this.state.read.books} />
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
