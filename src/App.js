import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: [],
        query: '',
        searchResults: []

    }

    updateQuery = (query) => {
        this.searchForBooks(query);
        this.setState(() => ({
            query: query.trim()
        }))

    }
    clearQuery = () => {
        this.updateQuery('')

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

    searchForBooks(query) {
        console.log("calling search books with query:" + query)
        BooksAPI.search(query)
            .then((books) => {
                this.setState(() => ({
                    searchResults: books
                }))
            })
        console.log(this.state.searchResults)
    }


    render() {
        let searchResults = this.state.searchResults;
        let books = this.state.books;
        const {query} = this.state



        return (

            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <button className="close-search"
                                    onClick={() => this.setState({showSearchPage: false})}>Close
                            </button>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                <input type="text" placeholder="Search by title or author" value={query}
                                       onChange={(event) => this.updateQuery(event.target.value)}/>

                            </div>
                        </div>
                        <div className="search-books-results">

                            <BookList books={searchResults} bookCatagory={''}
                                      onMoveBook={this.handleMoveBook}/>

                            <ol className="books-grid"/>
                        </div>
                    </div>
                ) : (
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
                            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
