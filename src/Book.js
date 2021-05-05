import React from 'react';

class Book extends React.Component {

    handleChange = (book, event) => {
        this.props.onMoveBook(book, event.target.value)
    }

    //return JSX
    render() {
        return (

            <li>
                <div className="book">
                    <div className="book-top">

                        <div className="book-cover" style={{
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail })`
                        }}/>
                        <div className="book-shelf-changer">
                            <select onChange={(event) => this.handleChange(this.props.book, event)} defaultValue={this.props.book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        );
    }
}


export default Book
