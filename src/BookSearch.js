import React, {Component} from 'react';
import BookList from "./BookList";
import * as BooksAPI from "./BooksAPI";
import { Link } from 'react-router-dom';


class BookSearch extends Component {

    state = {

        query: '',
        searchResults: []

    }

    updateQuery = (query) => {

            this.searchForBooks(query);
            this.setState(() => ({
                query: query
            }))



    }
    clearQuery = () => {
        this.setState(() => ({
            query: "",
            searchResults: []
        }))

    }

    combineSearchResultsAndBooks = (searchResults) => {
        return this.state.searchResults;
        // this.state.searchResults.map(book => {
        //     this.props.myBooks.map(b => {
        //         if (b.id === book.id){
        //             book.shelf = b.shelf;
        //         }
        //         return b;
        //     });
        //     return book;
        // })
    }


    searchForBooks(query) {

        if (query.length > 0 ){
            BooksAPI.search(query)
                .then((books) => {
                  if (books.error) {
                    this.setState({searchResults: []})
                  } else {
                    this.setState({searchResults: books})
                  }
                });
        } else {
            this.setState({searchResults: []});
        }

    }






    render(){
        // since the search results don't have info about the shelf the book is on...
        // loop through the list and my shelf and update the shelf info so the move component works correctly
        const updatedBooks = this.state.searchResults.map(book => {
            this.props.myBooks.map(b => {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                }
                return b;
            });
            return book;
        });
        return (
            <div className="search-books">
                <div className="search-books-bar">
                   <Link to="/">
                       <button className="close-search"
                            onClick={() => this.clearQuery()}>Close
                    </button>
                </Link>
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

                    <BookList books={updatedBooks} bookCatagory={''}
                              onMoveBook={this.props.onMoveBook}/>

                    <ol className="books-grid"/>
                </div>
            </div>
            )

    }

}

export default BookSearch;
