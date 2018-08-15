import React from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'

class AddLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

  componentDidMount() {
    Modal.setAppElement('body')
  }

  onSubmit = e => {
    e.preventDefault()
    const url = this.state.url
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.handleModalClose()
        } else {
          this.setState({ error: err.reason })
        }
      })
    }
  }

  onChange = e => {
    this.setState({ url: e.target.value.trim() })
  }

  handleModalClose = () => {
    this.setState({ url: '', isOpen: false, error: '' })
  }

  render() {
    const { url, error, isOpen } = this.state
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ isOpen: true })
          }}>
          + Add Link
        </button>
        <Modal
          isOpen={isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus}
          onRequestClose={this.handleModalClose}>
          <p>Add Link</p>
          {error ? <p>{error}</p> : undefined}
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              ref="url"
              onChange={this.onChange}
              value={url}
              placeholder="URL"
            />
            <button> Add Link</button>
          </form>
          <button
            onClick={() => {
              this.setState({ url: '', isOpen: false, error: '' })
            }}>
            Cancel
          </button>
        </Modal>
      </div>
    )
  }
}

export default AddLink
