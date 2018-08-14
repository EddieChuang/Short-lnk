import React from 'react'

import { LinksList, PrivateHeader, AddLink, LinksListFilters } from '.'

const Link = () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <LinksListFilters />
      <LinksList />
      <AddLink />
    </div>
  )
}

export default Link
