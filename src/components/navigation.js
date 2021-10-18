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
    <nav
      className="global-nav"
      style={{
        backgroundColor: "black",
        color: "white",
        // maxWidth: 1080,
        margin: "0 auto",
        // padding: "0.8rem",
        position: "sticky",
        top: 0,
        zIndex: 666,
      }}
    >
      <div
        className="nav-wrapper"
        style={{
          backgroundColor: "black",
          color: "white",
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0.8rem",
          textTransform: "uppercase",
          // position: "sticky",
          // top: 0,
        }}
      >
        <a href="/">Artbase</a>
        <a href="/">Event</a>
        <a href="/">Library</a>
        <a href="/">About</a>
        <a
          href="https://list.waikato.ac.nz/postorius/lists/ada_list.list.waikato.ac.nz/"
          target="_blank"
          rel="noreferrer"
        >
          Subscribe
        </a>
        <a href="/artbase/contribute/">Contribute</a>
        <a href="/symposium2021/call-for-participation-ada-symposium-poneke-wellington-indeterminate-infrastructures-objects-signals-and-architectures/">
          Symposium 2021 - CFP
        </a>
      </div>
    </nav>
  )
}

export default Navigation
