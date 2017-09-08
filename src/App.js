import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper';
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Query from './Query'
import './App.css'


class BooksApp extends Component {
  static propTypes = {
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
      // console.log(books)
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
  }

  setShowSearchPage = (set)=> {
    this.setState({showSearchPage: set })
  }

  render() {
    const { listTitles, shelves, books, search, showSearchPage } = this.state
    return (
      <div className="app">
        {showSearchPage ? (
          <div className="search-books">
            <Query 
              books={books}
              onTransferShelf={this.transferShelf}
              listTitles={listTitles}
              setShowSearchPage={this.setShowSearchPage}
            />
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
              <a onClick={() => this.setShowSearchPage(true)}>Add a book</a>

            </div>

          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
