import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';

class BooksApp extends React.Component {
    constructor() {
        super();
        this.state = { books: [] }
        this.sortBooks = this.sortBooks.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    sortBooks(books) {
        let categories = {
            currentlyReading: {title: 'Currently Reading', books: []},
            wantToRead: {title: 'Want to Read', books:[]},
            read: {title: 'Read', books:[]}
        }

        books.forEach( book => categories[book.shelf].books.push(book))
        return [categories.currentlyReading, categories.wantToRead, categories.read];
    }

    updateBook(book, shelf) {
        BooksAPI.update(book, shelf)
            .then( result => {
                // assuming API call is successful
                if(shelf === 'none') {
                    // remove book from UI
                    this.setState( prevState => ({
                        books: prevState.books.filter( _book => _book.id !== book.id)
                    }))
                } else {
                    this.setState( prevState => {
                        prevState.books.map( _book => {
                            //  update shelf
                            if (_book.id === book.id) {
                                _book.shelf = shelf
                            }
                            return _book
                        })
                    })
                }
            })
            .catch('Error updating books');
    }

    componentDidMount() {
        BooksAPI.getAll().then( books => {
            this.setState({books})
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={ () => (
                    <MainPage
                        books={this.state.books}
                        updateBook={this.updateBook}
                        sortBooks={this.sortBooks} />
                )}/>
                <Route path='/search' render={ () => (
                    <SearchPage
                        books={this.state.books}
                        updateBook={this.updateBook}
                        sortBooks={this.sortBooks}  />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
