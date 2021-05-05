import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import React from 'react';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],

    }

    //call the api to update things, then update the state to reflect the change
    handleMoveBook = (book, event) => {
        BooksAPI.update(book, event);
        this.updateItem(book, {shelf: event})


    }

    //find the book in the state, and update it with the new shelf
    updateItem(book, shelf) {
        let index = this.state.books.findIndex(x => x.id === book.id);
        if (index === -1) {
            console.log('new book - insert it. ' );
            book.shelf = shelf.shelf
            this.setState((currentState) => ({
                books: currentState.books.concat([book])
            }))
        } else
            this.setState({
                books: [
                    ...this.state.books.slice(0, index),
                    Object.assign({}, this.state.books[index], shelf),
                    ...this.state.books.slice(index + 1)
                ]
            });
    }


    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
                console.log("books " + JSON.stringify(this.state.books))
                console.log("number of books " + this.state.books.length)

            })
    }




    render() {
        let books = this.state.books;

        return (

            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div>
                            <BookList books={books.filter(book => book.shelf === 'currentlyReading')}
                                      bookCatagory={'Currently Reading'}
                                      onMoveBook={this.handleMoveBook}/>
                            <BookList books={books.filter(book => book.shelf === 'wantToRead')}
                                      bookCatagory={'Want to Read'}
                                      onMoveBook={this.handleMoveBook}/>
                            <BookList books={books.filter(book => book.shelf === 'read')} bookCatagory={'Read'}
                                      onMoveBook={this.handleMoveBook}/>
                        </div>
                        <div className="open-search">
                            <Link to="/search">
                                <button>Add a book</button>
                            </Link>
                        </div>
                    </div>
                )}
                />
                <Route path="/search" component={BookSearch} />
            </div>
        )}
}

export default BooksApp
