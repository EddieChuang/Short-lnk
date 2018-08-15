import React from 'react'

import { LinksList, PrivateHeader, AddLink, LinksListFilter } from '.'

const Link = () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <LinksListFilter />
      <LinksList />
      <AddLink />
    </div>
  )
}

export default Link
