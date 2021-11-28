import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

import ImgSymposium from "../assets/ada-sym-green.gif"

const Home = () => {
  return (
    <Layout isHomePage>
      <Seo title="Homepage" />
      <TempSymposium>
        <div className="symposium-container">
          <img
            src={ImgSymposium}
            alt="inderterminate infrastructure text behind green background"
          />
          <Link className="symposium-link" to="/tag/symposium2021/">
            <h2>ADA.NET Pōneke/Wellington symposium 2021</h2>
          </Link>
        </div>
      </TempSymposium>
    </Layout>
  )
}

export default Home

const TempSymposium = styled.section`
  height: 100vh;
  position: relative;
  /* background: #75f954; */
  background: #00fe28;

  @media screen and (min-width: 940px) {
    height: calc(100vh - 36px);
  }

  .symposium-link {
    position: absolute;
    bottom: 1rem;
    z-index: 666;
    display: block;
  }

  img {
    width: 100%;
    padding: 3rem 1rem;
  }

  h2 {
    margin: 0 0 2rem 1rem;
    @media screen and (min-width: 940px) {
      text-align: center;
    }
  }
`
