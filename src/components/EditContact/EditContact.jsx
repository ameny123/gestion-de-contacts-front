import React, { Component } from "react";
import './EditContact.css';
import axios from "axios";
import { withRouter } from 'react-router'
import { toast, ToastContainer } from "react-toastify";

class EditContact extends Component {
  state = {
    _id: '',
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    adresse: "",
    creationDate: "",
    fonction: "",
    CA: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
      let search = this.props.location.search,
        idContact = search.substring(1, search.length);
      console.log('id EDIT', idContact);
      const updateContact = await axios(`http://localhost:5000/api/contacts/${idContact}`);
      console.log('updateContact', updateContact);
      const { _id, firstName, lastName, phoneNumber, email, adresse, creationDate, fonction, CA } = updateContact.data.contact;
      console.log('response', updateContact.data.contact);
      this.setState({ _id, firstName, lastName, phoneNumber, email, adresse, creationDate, fonction, CA });
    } catch (err) {
      this.setState({ response: "Contact not found!" })
    }
  };

  updateContactHandler = async (e) => {
    e.preventDefault();
    try {
      const contact = await axios.put(`http://localhost:5000/api/contacts/${this.state._id}`, {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        phoneNumber: this.refs.phoneNumber.value,
        email: this.refs.email.value,
        adresse: this.refs.adresse.value,
        creationDate: this.refs.creationDate.value,
        fonction: this.refs.fonction.value,
        CA: this.refs.CA.value,
      });
      toast(contact.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });

    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    if (this.state.response === "Contact not found!")
      return <h1>Contact not found!</h1>
    return (
      <div className="Edit-Contact-Wrapper">
        <h1>Edit contact page</h1>
        <form onSubmit={this.updateContactHandler}>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            name="firstName"
            ref="firstName"
            className="Edit-Contact-Input"
            onChange={this.onChangeHandler}
            value={this.state.firstName}
            required
            id="firstName"
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            name="lastName"
            ref="lastName"
            className="Edit-Contact-Input"
            onChange={this.onChangeHandler}
            value={this.state.lastName}
            required
            id="lastName"
          />

          <label htmlFor="phoneNumber">Phone number: </label>
          <input
            type="number"
            name="phoneNumber"
            ref="phoneNumber"
            className="Edit-Contact-Input"
            onChange={this.onChangeHandler}
            value={this.state.phoneNumber}
            required
            id="phoneNumber"
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            ref="email"
            className="Edit-Contact-Input"
            onChange={this.onChangeHandler}
            value={this.state.email}
            required
            id="email"
          />

          <label htmlFor="adresse">Adresse: </label>
          <input
            type="text"
            name="adresse"
            ref="adresse"
            className="Edit-Contact-Input"
            required
            onChange={this.onChangeHandler}
            id="adresse"
            value={this.state.adresse}
          />

          <label htmlFor="creationDate">Creation date: </label>
          <input
            type="date"
            name="creationDate"
            ref="creationDate"
            className="Edit-Contact-Input"
            required
            onChange={this.onChangeHandler}
            id="creationDate"
            value={this.state.creationDate}
          />

          <label htmlFor="fonction">Function: </label>
          <input
            type="text"
            name="fonction"
            ref="fonction"
            className="Edit-Contact-Input"
            required
            onChange={this.onChangeHandler}
            id="fonction"
            value={this.state.fonction}
          />

          <label htmlFor="CA">CA: </label>
          <input
            type="number"
            name="CA"
            ref="CA"
            className="Edit-Contact-Input"
            required
            onChange={this.onChangeHandler}
            id="CA"
            value={this.state.CA}
          />
          <button type="submit" className="Edit-Contact-Submit fa fa-pencil"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditContact);
