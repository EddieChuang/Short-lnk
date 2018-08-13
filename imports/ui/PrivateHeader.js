import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'

class PrivateHeader extends React.Component {
  onLogout = () => {
    Accounts.logout()
    // this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    )
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader
