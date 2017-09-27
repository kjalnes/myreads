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
        this.updateBook = this.updateBook.bind(this);
    }

    updateBook(book, shelf) {
        BooksAPI.update(book, shelf)
        .then( () => BooksAPI.getAll().then( books => this.setState({books})))
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
                        updateBook={this.updateBook} />
                )}/>
                <Route path='/search' render={ () => (
                    <SearchPage books={this.state.books} />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
