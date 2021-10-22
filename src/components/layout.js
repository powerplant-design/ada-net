import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import Navigation from "./navigation"

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
      {/* @LUCAS!! Can we cut the header out into a seperate component perhaps? */}
      <header
        className="global-header"
        style={{
          backgroundColor: "black",
          color: "white",
          //   display: "flex",
          //   justifyContent: "center",
          //   padding: "0.8rem",
          //   maxWidth: 1080,
          //   margin: "0 auto",
        }}
      >
        {isHomePage ? (
          <h1
            className="main-heading"
            style={{
              backgroundColor: "black",
              color: "white",
              maxWidth: 1080,
              margin: "0 auto",
              padding: "2rem 1rem 1rem",
            }}
          >
            {/* <Link to="/">{parse(title)}</Link> */}
            <h1 style={{ color: "white", textAlign: "center" }}>
              {parse(title)}
            </h1>
          </h1>
        ) : (
          <Link
            className="header-link-home"
            to="/"
            style={{ textAlign: "center" }}
          >
            {/* {title} */}
          </Link>
        )}
      </header>

      <Navigation />

      <div className="global-wrapper" data-is-root-path={isHomePage}>
        <main>{children}</main>

        <Footer />
      </div>
    </main>
  )
}

export default Layout
