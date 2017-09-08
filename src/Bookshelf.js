import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'


class Bookshelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfCategory: PropTypes.string.isRequired,
    onTransferShelf: PropTypes.func
  }

  render(){
    const { books, shelfCategory, onTransferShelf } = this.props
    

    return(
      <div>
        <h2 className="bookshelf-title">{ shelfCategory }</h2>
        <ol className="books-grid">
          {books.map(book =>(
            <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <ShelfChanger 
                          onTransferShelf={onTransferShelf} 
                          book={book}
                          shelf={book.shelf}
                      />
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors.map(author => (
                    <div className="book-authors">{author}</div>
                  ))}
                </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Bookshelf
