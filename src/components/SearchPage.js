import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Books from './Books';

class SearchPage extends Component {
    state = {
        query: '',
        books: []
    }

    onChange = (event) => {
        this.setState({query: event.target.value})
    }

    removeExistingBooks(books) {
        const existingBookIds = this.props.books.map( book => book.id)
        return books && books.length ?
            books.filter( _book => existingBookIds.indexOf(_book.id) === -1)
            : []
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.query !== this.state.query && nextState.query) {
            BooksAPI.search(nextState.query, 20)
                .then( books => {
                    // remove books that exist in shelves
                    this.setState({books: this.removeExistingBooks(books)})
                })
        }
    }

    render() {
        const { books } = this.state;
        const { updateBook } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input onChange={this.onChange} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    { books && books.length ?
                        <Books books={books} updateBook={updateBook} addBook={true} />
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default SearchPage;
