import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: '' }
  }

  onSubmit = e => {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    Meteor.loginWithPassword({ email }, password, err => {
      console.log('Login callback', err)
      if (err) {
        this.setState({ error: err.reason })
      } else {
        this.setState({ error: '' })
      }

      // this.props.history.push('/links')
    })
  }

  render() {
    return (
      <div>
        <h1>Login to Short Lnk</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
          />
          <button>Login</button>
        </form>
        <Link to="/signup">Have an account?</Link>
      </div>
    )
  }
}
export default Login
// export default withRouter(Login)
