import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import Navigation from "./navigation"

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
    <main>
      <header
        className="global-header"
        style={{
          backgroundColor: "black",
          color: "white",
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
              padding: "2rem 1rem 0",
            }}
          >
            <Link to="/">{parse(title)}</Link>
          </h1>
        ) : (
          <Link className="header-link-home" to="/">
            {/* {title} */}
          </Link>
        )}
      </header>
      <Navigation />

      <div className="global-wrapper" data-is-root-path={isHomePage}>
        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()} ADA – Aotearoa Digital Arts Network .
          Creative Commons licensed unless otherwise stated.
        </footer>
      </div>
    </main>
  )
}

export default Layout
