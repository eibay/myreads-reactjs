import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ShelfChanger extends Component{

  static propTypes = {
    book: PropTypes.object.isRequired,
    onTransferShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }

  handleChange = (e) => {
    this.props.onTransferShelf(this.props.book, e.target.value)
  }

  render(){
    return(
      <div>
        <select value={this.props.shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger