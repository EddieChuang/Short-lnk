import { Meteor } from 'meteor/meteor'
import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'
import { createContainer } from 'meteor/react-meteor-data'

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
      <p className="item__message">
        {visitedCount} {visitMessage} {visitedMessage}
      </p>
    )
  }

  render() {
    const justCopied = this.state.justCopied
    const { _id, url, shortUrl, visible } = this.props
    return (
      <div className="item">
        <h2>{url}</h2>
        <p className="item__message">{shortUrl}</p>
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          href={shortUrl}
          target="_blank">
          Visit
        </a>
        <button
          className="button button--pill"
          ref="copy"
          data-clipboard-text={url}>
          {justCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          className="button button--pill"
          ref="setVis"
          onClick={() => {
            this.props.linksSetVisibility(_id, !visible)
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
  lastVisitedAt: PropTypes.number,
  linksSetVisibility: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    linksSetVisibility: (_id, visible) => {
      Meteor.call('links.setVisibility', _id, visible)
    }
  }
}, LinksListItem)
