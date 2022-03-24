import React, { Component } from "react";
import './AddContact.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddContact extends Component {
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


  addContact = async e => {

    e.preventDefault();
    console.log('e', e)
    try {
      const newContact = await axios.post("http://localhost:5000/api/contacts", {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        phoneNumber: this.refs.phoneNumber.value,
        email: this.refs.email.value,
        adresse: this.refs.adresse.value,
        creationDate: this.refs.creationDate.value,
        fonction: this.refs.fonction.value,
        CA: this.refs.CA.value,
      }
      );
      console.log('newContact', newContact);

      toast("Created successfully", { type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="AddContact-Wrapper">
        <h1>Add new contact:</h1>
        <form onSubmit={this.addContact}>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            name="firstName"
            ref="firstName"
            className="Add-Contact-Input"
            onChange={this.onChangeHandler}
            id="firstName"
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            name="lastName"
            ref="lastName"
            className="Add-Contact-Input"
            required
            id="lastName"
          />

          <label htmlFor="phoneNumber">Phone number: </label>
          <input
            type="number"
            name="phoneNumber"
            ref="phoneNumber"
            className="Add-Contact-Input"
            required
            id="phoneNumber"
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            ref="email"
            className="Add-Contact-Input"
            required
            id="email"
          />

          <label htmlFor="adresse">Adresse: </label>
          <input
            type="text"
            name="adresse"
            ref="adresse"
            className="Add-Contact-Input"
            required
            id="adresse"
          />

          <label htmlFor="creationDate">Creation date: </label>
          <input
            type="date"
            name="creationDate"
            ref="creationDate"
            className="Add-Contact-Input"
            required
            id="creationDate"
          />

          <label htmlFor="fonction">Function: </label>
          <input
            type="text"
            name="fonction"
            ref="fonction"
            className="Add-Contact-Input"
            required
            id="fonction"
          />

          <label htmlFor="CA">CA: </label>
          <input
            type="number"
            name="CA"
            ref="CA"
            className="Add-Contact-Input"
            required
            id="CA"
          />

          <button type="submit" className="Add-Contact-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Contact-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddContact;
