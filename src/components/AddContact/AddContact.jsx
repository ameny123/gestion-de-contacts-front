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
            type="text"
            name="phoneNumber"
            ref="phoneNumber"
            className="Add-Contact-Input"
            required
            id="phoneNumber"
          />

          <label htmlFor="email">email: </label>
          <input
            type="text"
            name="email"
            ref="email"
            className="Add-Contact-Input"
            required
            id="email"
          />

          {/* 
          <label htmlFor="skills">Skills: </label>
          <input
            type="text"
            placeholder="Skills sepertaed by ;"
            name="skills"
            ref="skills"
            className="Add-Contact-Input"
            required
            id="skills"
          /> */}


          <button type="submit" className="Add-Contact-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Contact-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddContact;
