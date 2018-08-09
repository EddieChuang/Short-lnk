import React from 'react'
import { withRouter } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Links } from '../api'
import { LinksList } from '.'

class Link extends React.Component {
  constructor(props) {
    super(props)
  }

  onLogout = () => {
    Accounts.logout()
    this.props.history.push('/')
  }

  onSubmit = e => {
    e.preventDefault()
    const url = this.refs.url.value.trim()
    if (url) {
      Links.insert({ url })
      this.refs.url.value = ''
    }
  }

  render() {
    return (
      <div>
        <h1>Your Link</h1>
        <button onClick={this.onLogout}>Logout</button>

        <LinksList />
        <p>Add Link</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="url" placeholder="URL" />
          <button> Add Link</button>
        </form>
      </div>
    )
  }
}
export default Link
// export default withRouter(Link)
