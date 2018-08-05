import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

export interface LinkProps {
  history: any
}

class Link extends React.Component<LinkProps, object> {
  constructor(props: LinkProps) {
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
export default withRouter(Link)
