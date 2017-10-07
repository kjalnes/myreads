import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';


class BooksApp extends React.Component {

    state = { books: [] }

    updateBook = (book, shelf, addBook) => {
        BooksAPI.update(book, shelf)
            .then( () => {
                const books =
                  shelf === 'none' ? this.removeBook(book.id) // remove existing book
                : addBook === true ? this.addBook(book, shelf) // add new book to shelves
                : this.updateExistingBook(book, shelf); //  update existing book

                this.setState({books});
            })
            .catch('Error updating books');
    }

    removeBook = (id) => this.state.books.filter( _book => _book.id !== id)

    addBook = (book, shelf) => {
        book.shelf = shelf;
        return this.state.books.concat([book]);
    }

    updateExistingBook = (book, shelf) => {
        return this.state.books.map( _book => {
            if (_book.id === book.id) {
                _book.shelf = shelf;
            }
            return _book;
        })
    }

    componentDidMount() {
        BooksAPI.getAll().then( books => {
            this.setState({books});
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={ () => (
                    <MainPage
                        books={this.state.books}
                        updateBook={this.updateBook} />
                )}/>
                <Route path='/search' render={ () => (
                    <SearchPage
                        books={this.state.books}
                        updateBook={this.updateBook} />
                )}/>
            </div>
        )
    }
}

// Question: Should PropTypes that get passed down to children be defined on each level or is it enough to define it in the parent component?

BooksApp.propTypes = {
    books: PropTypes.array,
    updateBook: PropTypes.func
};


export default BooksApp;
