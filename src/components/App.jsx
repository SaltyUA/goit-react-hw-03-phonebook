import { Component } from 'react';
import Form from './form';
import ContactList from './contactList';
import FilterInput from './filterInput';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (!contacts) return;
    this.setState(() => ({
      contacts: JSON.parse(contacts),
    }));
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleFilter = ({ target: { value } }) => {
    this.setState(() => ({
      filter: value,
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  submitContact = ({ name, number }) => {
    const id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, name, number }],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filtered = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form contacts={contacts} onSubmit={this.submitContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <FilterInput fiterValue={filter} handleFilter={this.handleFilter} />
        ) : (
          <p>There no contacts yet</p>
        )}
        {filtered.length > 0 && (
          <ContactList
            contacts={filtered}
            filterValue={filter}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default App;
