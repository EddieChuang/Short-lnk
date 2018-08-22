import React from 'react'

import { LinksList, AddLink, LinksListFilter } from '.'
import PrivateHeader from './PrivateHeader'
const Link = () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <div className="page-content">
        <LinksListFilter />
        <LinksList />
        <AddLink />
      </div>
    </div>
  )
}

export default Link
