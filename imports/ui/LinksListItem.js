import { Meteor } from 'meteor/meteor'
import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'

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

  renderStats = () => {
    const { visitedCount, lastVisitedAt } = this.props
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
    let visitedMessage = null

    if (typeof lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(lastVisitedAt).fromNow()})`
    }

    return (
      <p>
        {visitedCount} {visitMessage} {visitedMessage}
      </p>
    )
  }

  render() {
    const justCopied = this.state.justCopied
    const { _id, url, shortUrl, visible } = this.props
    return (
      <div>
        <p>{url}</p>
        <p>{shortUrl}</p>
        <p>{visible.toString()}</p>
        {this.renderStats()}
        <a href={shortUrl} target="_blank">
          Visit
        </a>
        <button ref="copy" data-clipboard-text={url}>
          {justCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          onClick={() => {
            Meteor.call('links.setVisibility', _id, !visible)
          }}>
          {visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}

export default LinksListItem
