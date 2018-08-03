import React from 'react'
import { withRouter } from 'react-router-dom'

class Link extends React.Component {
  onLogout = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1>Your Link</h1>
        <button onClick={this.onLougout}>Logout</button>
      </div>
    )
  }
}
export default withRouter(Link)
