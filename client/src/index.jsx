import React from 'react';
import { render } from 'react-dom';
import css from './styles/styles.css';
import { BrowserRouter } from 'react-router-dom';
import ListingDetails from './components/listingDetails.jsx'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
// import SearchBar from 'material-ui-search-bar'
import SearchResults from './components/SearchResults'
import Search from './components/Search.jsx'
import NavBar from './components/NavBar.jsx'
import data from '../../lib/dummyData.js';
import $ from 'jquery'
import Checkout from './components/Checkout.jsx';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      query: '',
      results: [],
      listing: {},
      startDate: null,
      endDate: null
    }
    this.searchTerm = this.searchTerm.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleListingClick = this.handleListingClick.bind(this);
  }

  searchTerm(term) {
    this.setState({ query: term });
  }

  handleListingClick(listingID) {
    // called when a list item is clicked on.
    fetch(`/api/listings/${listingID}`)//, options)
    .then((response) => response.json())
    .then((json) => {
      console.log('LC-JSON: ', json)
      this.setState({
        listing: json,
        view: 'listingDetails'
      })
    }).catch(err => console.log(err));
  };

  handleSearchClick() {
    //called from search bar, submits a search request for locations near searched area
    const options = {
      method: 'GET',
      contentType: "application/json",
      mode: 'cors',
      cache: 'default'
    }
    fetch(`/api/listings?q=${this.state.query}`, options)
      .then((response) => response.json())
      .then((json) => {
        console.log('SC-JSON: ', json)
        if (json.length > 0){
          this.setState({
            results: json,
            view: 'searchResults'
          });
        } else {
          console.log('Either no search term entered or no results found');
        }
      }
    )
    //this.setState({view: 'searchResults'})
  }

  render() {
    const currentView = this.state.view;
    let showPage = null;
    if (currentView === 'searchResults') {
      showPage = <SearchResults results={this.state.results} handleListingClick={this.handleListingClick} />;
    } else if (currentView === 'listingDetails') {
      showPage = <ListingDetails listing={this.state.listing} />;
    } else if (currentView === 'checkout') {
      showPage = <Checkout />;
    }

    return (
      <div>
        <div>
          <NavBar/>
        </div>
        <Search searchTerm={this.searchTerm} handleSearchClick={this.handleSearchClick}/>
        <br />
        <div>
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </div>
        <br/>
        <div>
          {showPage}
          <Login />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
