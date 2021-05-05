import React, {Component} from 'react';
import BookList from "./BookList";
import * as BooksAPI from "./BooksAPI";

class BookSearch extends Component {

    state = {

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

    render(){
        return (
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
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">

                    <BookList books={this.state.searchResults} bookCatagory={''}
                              onMoveBook={this.handleMoveBook}/>

                    <ol className="books-grid"/>
                </div>
            </div>
            )

    }

}

export default BookSearch;
