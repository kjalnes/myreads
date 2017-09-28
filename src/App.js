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

    sortBooks = (books) => {
        let categories = {
            currentlyReading: {title: 'Currently Reading', books: []},
            wantToRead: {title: 'Want to Read', books:[]},
            read: {title: 'Read', books:[]}
        }

        books.forEach( book => categories[book.shelf].books.push(book));
        return [categories.currentlyReading, categories.wantToRead, categories.read];
    }

    updateBook = (book, shelf, addBook) => {
        BooksAPI.update(book, shelf)
            .then( () => {
                if(shelf === 'none') {
                    // remove existing book
                    this.setState({ books: this.removeBook(book.id) })
                } else if(addBook === true) {
                    // add new book to shelves
                    this.setState({ books: this.addBook(book, shelf) })
                } else {
                    //  update existing book
                    this.setState({books: this.updateExistingBook(book, shelf) })
                }
            })
            .catch('Error updating books');
    }

    removeBook = (id) => this.state.books.filter( _book => _book.id !== id)

    addBook = (book, shelf) => {
        book.shelf = shelf;
        return this.state.books.concat([book])
    }

    updateExistingBook = (book, shelf) => {
        return this.state.books.map( _book => {
            if (_book.id === book.id) {
                _book.shelf = shelf
            }
            return _book
        })
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
