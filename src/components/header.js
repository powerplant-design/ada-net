import React from "react"
import Link from "gatsby"
import parse from "html-react-parser"

const Navigation = ({ title, isHomePage }) => {
  return (
    <header
      className="global-header"
      style={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      {isHomePage ? (
        <div
          className="main-heading"
          style={{
            backgroundColor: "black",
            color: "white",
            maxWidth: 1080,
            margin: "0 auto",
            padding: "2rem 1rem 2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "white" }}>{parse(title)}</h1>
        </div>
      ) : (
        // <Link to="/">X</Link>
        <span></span>
      )}
    </header>
  )
}

export default Navigation
