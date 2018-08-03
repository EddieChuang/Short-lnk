import React from 'react'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Join Short Lnk</h1>
        <Link to="/login">Already have an account?</Link>
      </div>
    )
  }
}
export default Signup
