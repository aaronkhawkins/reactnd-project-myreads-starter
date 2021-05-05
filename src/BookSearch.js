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
        return (
            <div className="search-books">
                <div className="search-books-bar">
                   <Link to="/">
                       <button className="close-search"
                            onClick={() => this.setState({showSearchPage: false})}>Close
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

                    <BookList books={this.state.searchResults} bookCatagory={''}
                              onMoveBook={this.props.onMoveBook}/>

                    <ol className="books-grid"/>
                </div>
            </div>
            )

    }

}

export default BookSearch;
