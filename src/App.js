import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'list',
    contacts: []
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      // this.setState({ contacts: contacts }) shorthand:
      this.setState({ contacts })
    })
  }
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div className='app'>
        {/* render is needed here because props are passed in */}
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate={() => {
              this.setState({ screen: 'create' })
            }}
          />
        )}/>
        {/* no render needed as there are no props */}
        <Route path='/create' component={CreateContact}/>
      </div>
    )
  }
}

export default App;
