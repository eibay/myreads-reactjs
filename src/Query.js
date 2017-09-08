import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import ListBooks from './ListBooks'


class Query extends Component{

  static propTypes = {
    setShowSearchPage: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    onTransferShelf: PropTypes.func.isRequired,
    listTitles: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  render(){
    const { query } = this.state 
    const { books, onTransferShelf, listTitles, setShowSearchPage } = this.props

    let filteredBooks
    if (query){
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredBooks = books.filter((book) => match.test(book.title) || match.test(book.authors) || match.test(book.shelf))
    }else {
      filteredBooks = books
    }


    return (
      <div>
        <div className="search-books-bar">
          <a className="close-search" onClick={() => setShowSearchPage(false)}>Close</a>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=> this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="list-books">
            <div className="list-books-title">
              <h1>{listTitles[1]}</h1>
            </div>
            <div className="list-books-content">
              <ListBooks
                shelfCategory={"Search Results"}
                books={filteredBooks}
                search={true}
                onTransferShelf={onTransferShelf}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Query