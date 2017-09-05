import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'


class ListBooks extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    setListTitle: PropTypes.string,
    shelfCategory: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    search: PropTypes.boolean
  }

  categorizeBooks(category){
    let showingBooks
    const match = new RegExp(escapeRegExp(category), 'i')
    showingBooks = this.props.books.filter((book) => match.test(book.shelf))
    return showingBooks
  }

  sortShelf(category){
    if (this.props.search === false){
      let shelfBooks
      shelfBooks = this.props.books.filter((book) => book.shelf === (category))
      return shelfBooks
    }else{
      return this.props.books
    }
  }

  render(){
    const { setListTitle, shelfCategory, shelf } = this.props
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>{setListTitle}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <Bookshelf
                books={this.sortShelf(shelf)}
                shelfCategory={shelfCategory}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
