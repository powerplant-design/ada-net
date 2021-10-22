// import React from "react"

// const TagsList = (link, { data }) => {
//   console.log(link)
//   console.log(data)
//   return <div>{link.name}</div>
// }

// export const query = graphql`
//   query MyQuery($name: String = "") {
//     allWpPost(
//       filter: { tags: { nodes: { elemMatch: { name: { eq: $name } } } } }
//     ) {
//       nodes {
//         id
//         title
//       }
//     }
//   }
// `

// export default TagsList
