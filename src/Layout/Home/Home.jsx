import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Contact from "../../components/Contact/Contact";
import SearchContacts from "../../components/SearchContact/SearchContacts";

class Home extends Component {
  state = {
    data: null,
    allContacts: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const contacts = await axios("http://localhost:5000/api/contacts");
      console.log('contacts', contacts);
      this.setState({ data: contacts.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeContact = async id => {
    try {
      const contactRemoved = await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      const contacts = await axios("http://localhost:5000/api/contacts");
      this.setState({ data: contacts.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  //search based on the name
  searchContacts = async username => {
    let allContacts = [...this.state.data.contacts];
    if (this.state.allContacts === null) this.setState({ allContacts });

    let contacts = this.state.data.contacts.filter((element) => {
      console.log('element', element);
      return element.firstName.toLowerCase().includes(username.toLowerCase())
        || element.lastName.toLowerCase().includes(username.toLowerCase())
        || element.email.toLowerCase().includes(username.toLowerCase())
        || element.adresse.toLowerCase().includes(username.toLowerCase())
        || element.fonction.toLowerCase().includes(username.toLowerCase())
    }
      // ({idS}) => idS.toLowerCase().includes(username.toLowerCase()), ({name}) => name.toLowerCase().includes(username.toLowerCase())
    );
    if (contacts.length > 0) this.setState({ data: { contacts } });

    if (username.trim() === "")
      this.setState({ data: { contacts: this.state.allContacts } });
  };

  render() {
    let contacts;

    if (this.state.data)
      contacts =
        this.state.data.contacts &&
        this.state.data.contacts.map(contact => (
          <Contact key={contact._id} {...contact} removeContact={this.removeContact} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.contacts.length)
        return <h1 className="No-Contacts">No recrods found!</h1>;

    return (
      <div className="Table-Wrapper">

        <SearchContacts searchContacts={this.searchContacts} />
        {contacts ?
          <>
            <h1>List of contacts:</h1>
            <table className="Table">

              <thead>
                <tr>

                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Adresse</th>
                  <th>Creation date</th>
                  <th>Function</th>
                  <th>CA</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{contacts}</tbody>
            </table> </> : <div></div>}
      </div>
    );
  }
}

export default Home;
