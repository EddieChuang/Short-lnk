import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  onSubmit = e => {
    e.preventDefault()
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()
    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 8 characters long'
      })
    }
    Accounts.createUser({ email, password }, err => {
      console.log('Signup')
      if (err) {
        this.setState({ error: err.reason })
      } else {
        this.setState({ error: '' })
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Join Short Lnk</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
          />
          <button>Create Account</button>
        </form>
        <Link to="/">Already have an account?</Link>
      </div>
    )
  }
}
export default Signup
// export default withRouter(Signup)
