import React from 'react';
import PropTypes from 'prop-types';
import Books from './Books';


const Shelf = ({title, books, updateBook}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <Books books={books} updateBook={updateBook} />
            </div>
        </div>
    );
}


export default Shelf;


Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    updateBook: PropTypes.func.isRequired
};
