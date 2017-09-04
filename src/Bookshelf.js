import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

  static propTypes = {
    books: PropTypes.array,
    shelfTitle: PropTypes.string
  }


  state = {
    booklist: []
  }

  render(){
    const { books, shelfTitle } = this.props
    return(

      <div>
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.map(book => (
            <li key={book.title}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
