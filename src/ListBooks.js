import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfCategory: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    onTransferShelf: PropTypes.func,
    search: PropTypes.bool
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
// TODO: Sample search code only, not hook up yet.
  searchBooks(category){
    let showingBooks
    const match = new RegExp(escapeRegExp(category), 'i')
    showingBooks = this.props.books.filter((book) => match.test(book.shelf))
    return showingBooks
  }

  render(){
    const { shelfCategory, shelf, onTransferShelf } = this.props

    return(
      <div className="bookshelf">
        <Bookshelf
          books={this.sortShelf(shelf)}
          shelfCategory={shelfCategory}
          onTransferShelf={onTransferShelf}
        />
      </div>
    )
  }
}

export default ListBooks
