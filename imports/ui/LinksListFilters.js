import React from 'react'
import { Session } from 'meteor/session'

const LinksListFilter = () => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={e => {
            Session.set('visible', !e.target.checked)
          }}
        />
        show hidden links
      </label>
    </div>
  )
}
