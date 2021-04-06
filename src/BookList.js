import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component{


    render(){
        const { books } = this.props;
        return (
            <ol className="books-grid">
                {books.map(book => (
                    <Book key={book.id} book={book} />
                ))}

            </ol>
        );
    }
}

export default BookList;
