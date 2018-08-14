import { Meteor } from 'meteor/meteor'
import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'

class LinksListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      justCopied: false
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)
    this.clipboard
      .on('success', () => {
        alert('success')
        this.setState({ justCopied: true })
        setTimeout(() => {
          this.setState({ justCopied: false })
        }, 1000)
      })
      .on('error', () => {
        alert('success')
      })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  render() {
    const justCopied = this.state.justCopied
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString()}</p>
        <button ref="copy" data-clipboard-text={this.props.url}>
          {justCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          onClick={() => {
            Meteor.call(
              'links.setVisibility',
              this.props._id,
              !this.props.visible
            )
          }}
        />
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.String.isRequired,
  url: PropTypes.String.isRequired,
  userId: PropTypes.String.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.String.isRequired
}

export default LinksListItem
