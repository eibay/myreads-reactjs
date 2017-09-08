import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Bookshelf from './Bookshelf'


class ListBooks extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfCategory: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    onTransferShelf: PropTypes.func,
    search: PropTypes.bool
  }

  sortShelf = (shelf)=> {
      let shelfBooks
      shelfBooks = this.props.books.filter((book) => book.shelf === (shelf))
      return shelfBooks
  }

  render(){
    const { books, shelfCategory, shelf, onTransferShelf, search } = this.props

    let showBooks
    if (search === false){
      showBooks = this.sortShelf(shelf)
    }else{
      showBooks = books
    }

    showBooks.sort(sortBy('title'))

    return(
      <div className="bookshelf">
        <Bookshelf
          books={showBooks}
          shelfCategory={shelfCategory}
          onTransferShelf={onTransferShelf}
        />
      </div>
    )
  }
}

export default ListBooks
