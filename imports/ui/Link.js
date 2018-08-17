import React from 'react'

import { LinksList, PrivateHeader, AddLink, LinksListFilter } from '.'

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
