import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Navigation = () => {
  // const { menu } = useStaticQuery(
  //   graphql`
  //     query MyQuery {
  //       wpMenu {
  //         id
  //         menuItems {
  //           nodes {
  //             parentId
  //             label
  //             path
  //             childItems {
  //               nodes {
  //                 path
  //                 label
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // )
  // console.log(menu)
  return (
    <nav className="global-nav">
      <a href="artbase">Artbase</a>
      <a href="artbase">Event</a>
      <a href="artbase">Library</a>
      <a href="artbase">About</a>
      <a
        href="https://list.waikato.ac.nz/postorius/lists/ada_list.list.waikato.ac.nz/"
        target="_blank"
        rel="noreferrer"
      >
        Subscribe
      </a>
      <a href="artbase">Contribute</a>
      <a href="artbase">Symposium 2021 - CFP</a>
    </nav>
  )
}

export default Navigation
