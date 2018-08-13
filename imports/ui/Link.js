import React from 'react'
import { LinksList, PrivateHeader, AddLink } from '.'

// class Link extends React.Component {
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Your Links" />

//         <LinksList />
//         <AddLink />
//       </div>
//     )
//   }
// }

const Link = () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <LinksList />
      <AddLink />
    </div>
  )
}

export default Link
