import React, { Component } from "react";
import "./SearchContacts.css";

class SearchContacts extends Component {
  state = { value: "" };

  onChangeHandler = e => {
    console.log('e.target.value', e.target.value);
    this.setState({ value: e.target.value }, () => {
      this.props.searchContacts(this.state.value);
    });
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Filter..."
        name="name"
        onChange={ this.onChangeHandler }
        className="Search-Contact-Input"
      />
    );
  }
}

export default SearchContacts;
