import React from 'react';

const Book = ({ book, updateBook }) => {

    const onChange = (event) => {
        const newShelf = event.target.value;
        updateBook(book, newShelf)
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                          <select onChange={onChange} value={book.shelf}>
                            <option value="none" disabled >Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                    </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    { book.authors.map( author => author).join(', ') }
                </div>
            </div>
      </li>
    )
}

export default Book;
