import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component{
  state = {
    booklist: []
  }

  render(){
    return(
      <div>
        <h2 className="bookshelf-title">{ this.props.shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map(book => (
            <li>
              <div className="book">
                <div className="book-top">
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors"></div>
              </div>
            </li>
          ))}
            <li>
            <div className="book">
              <Book />
            </div>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
