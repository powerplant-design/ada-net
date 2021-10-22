import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <FooterStyled style={{}}>
      <p>
        <Link href="/">
          © {new Date().getFullYear()} ADA–Aotearoa Digital Arts Network
        </Link>
      </p>
      <p>
        <a
          href="https://creativecommons.org/licenses/by-nc-nd/2.5/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Creative Commons licensed unless otherwise stated
        </a>
      </p>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  padding: 1rem;
  background-color: black;
  font-size: 0.8rem;
  color: white;
  @media screen and (min-width: 940px) {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0;
  }
`

export default Footer
