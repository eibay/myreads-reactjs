import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'


class ListBooks extends Component{
  static propTypes = {
    setListTitle: PropTypes.string
  }

  state = {
    books: [],
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render(){
    const { setListTitle } = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>{setListTitle}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <Bookshelf
                books={this.state.books}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
