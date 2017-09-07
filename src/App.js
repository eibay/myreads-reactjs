import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper';

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {
  static propTypes = {
    books: PropTypes.array,
    setListTitle: PropTypes.string,
    search: PropTypes.bool
  }

  state = {
     books: [],
     listTitles: ["MyReads", "MySearch"],
     shelves: [{slug: "currentlyReading", title: "Currently Reading", search: false},
                {slug: "wantToRead", title: "Want To Read", search: false},
                {slug: "read", title: "Read", search: false}],
    showSearchPage: false
  }

  componentDidMount(){
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  transferShelf = (book, shelf) => {
    const myBooks = this.state.books
    const modifiedBook = update(book, {shelf: {$set: (book.shelf = shelf)}} )
    const newBooks = update(myBooks, {$apply: function(){return modifiedBook }})
    this.setState(state => {
      books: newBooks
    })
    BooksAPI.update(modifiedBook, shelf)
    console.log(shelf)
  }

  render() {
    const { listTitles, shelves, showSearchPage, books, search } = this.state
    return (
      <div className="app">
        {showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>

            <div className="search-books-results">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>{listTitles[1]}</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <ListBooks
                      shelfCategory={"Search Results"}
                      books={books}
                      search={true}
                      onTransferShelf={this.transferShelf}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>{listTitles[0]}</h1>
              </div>
              <div className="list-books-content">
                {shelves.map(shelf =>
                  <div key={shelf.slug}>
                    <ListBooks
                      shelfCategory={shelf.title}
                      books={books}
                      shelf={shelf.slug}
                      search={shelf.search}
                      onTransferShelf={this.transferShelf}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>

          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
