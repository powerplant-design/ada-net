import React from "react"
// import Link from "gatsby"
import styled from "styled-components"
import parse from "html-react-parser"

const Header = ({ title, isHomePage }) => {
  return (
    <HeaderStyled
      className="global-header"
      style={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      {isHomePage ? (
        <div className="header-homepage">
          <h1>{parse(title)}</h1>
        </div>
      ) : (
        // <Link to="/">X</Link>
        <span></span>
      )}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  color: white;
  background: black;
  .header-homepage {
    max-width: 1080px;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;

    h1 {
      color: white;
      font-size: 1rem;
      letter-spacing: 1px;
      @media screen and (min-width: 940px) {
        font-size: 2.6rem;
      }
    }
  }
`

export default Header
