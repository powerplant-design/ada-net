import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <FooterContainer style={{}}>
      <p>
        EXPLORE: <Link to="/tag">TAGS</Link>
      </p>
      <p>
        <a
          href="https://www.instagram.com/_ada_network/"
          rel="noreffer noopener"
        >
          INSTAGRAM
        </a>
      </p>
      <p>
        <a href="https://www.facebook.com/ADA.net.nz" rel="noreffer noopener">
          METABOOK
        </a>
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
      <p>
        {/* <Link href="/"> */}© {new Date().getFullYear()} Aotearoa Digital
        Arts Network
        {/* </Link> */}
      </p>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
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
