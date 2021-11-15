import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Navigation from "./navigation"
import Header from "./header"

import Footer from "./footer"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <main style={{ backgroundColor: "white" }}>
      <Header title={title} isHomePage={isHomePage} />

      <Navigation isHomePage={isHomePage} />

      <div
        id="content-home"
        className="global-wrapper"
        data-is-root-path={isHomePage}
      >
        <main>{children}</main>

        <Footer />
      </div>
    </main>
  )
}

export default Layout
