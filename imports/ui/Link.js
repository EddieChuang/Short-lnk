import React from 'react'
import { withRouter } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

class Link extends React.Component {
  constructor(props) {
    super(props)
  }

  onLogout = () => {
    Accounts.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1>Your Link</h1>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    )
  }
}
export default Link
// export default withRouter(Link)
