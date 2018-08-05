import * as React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

interface LoginProps {}
interface LoginState {
  error: string
}

class Login extends React.Component<LoginProps, LoginState> {
  public refs: {
    email: HTMLInputElement
    password: HTMLInputElement
  }

  constructor(props: LoginProps) {
    super(props)
    this.state = { error: '' }
  }

  onSubmit = e => {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    Meteor.loginWithPassword({ email }, password, err => {
      console.log('Login callback', err)
    })
  }

  render() {
    return (
      <div>
        <h1>Login to Short Lnk</h1>
        {this.state.error ? <p>this.state.error</p> : undefined}
        <form onSubmit={this.onSubmit}>
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