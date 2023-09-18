import { Component } from 'react';
import Form from './form';
import ContactList from './contactList';
import FilterInput from './filterInput';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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
        <FilterInput fiterValue={filter} handleFilter={this.handleFilter} />
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
