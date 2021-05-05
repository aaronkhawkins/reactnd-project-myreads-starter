import React, {Component} from 'react';
import Book from './Book';

class BookList extends Component {



    render() {
        const {books} = this.props;
        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookCatagory}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <Book key={book.id} book={book} onMoveBook={this.props.onMoveBook}/>
                        ))}

                    </ol>
                </div>
            </div>
        );
    }
}

export default BookList;
