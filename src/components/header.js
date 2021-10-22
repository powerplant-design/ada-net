import React from "react"
import parse from "html-react-parser"

const Navigation = ({ title }) => {
  return (
    <header
      className="global-header"
      style={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      <div
        className="main-heading"
        style={{
          backgroundColor: "black",
          color: "white",
          maxWidth: 1080,
          margin: "0 auto",
          padding: "2rem 1rem 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "white" }}>{parse(title)}</p>
      </div>
    </header>
  )
}

export default Navigation
