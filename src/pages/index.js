import React, { useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

import IndexLibrary from "../components/indexLibrary"
import IndexEvent from "../components/indexEvent"
import IndexArtbase from "../components/indexArtbase"

import ImgSymposium from "../assets/ada-sym-green.gif"

const Home = () => {
  useEffect(() => {
    const symposiumVideo = document.getElementById("video")
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) symposiumVideo.play()
      },
      { threshold: [0] }
    )

    observer.observe(document.querySelector("#video"))
  }, [])

  return (
    <Layout isHomePage>
      <Seo title="Homepage" />
      <TempSymposium>
        <div className="symposium-container">
          <video
            style={{ maxHeight: "82vh" }}
            id="video"
            width="100%"
            height="100%"
          >
            <source src="ada-splash-compressed.mp4" type="video/mp4" />
            <img
              src={ImgSymposium}
              alt="inderterminate infrastructure text behind green background"
            />
          </video>
          <Link className="symposium-link" to="/tag/symposium2021/">
            <h2>Pōneke/Wellington Symposium 2021</h2>
          </Link>
        </div>
      </TempSymposium>

      <IndexLibrary />
      <IndexEvent />
      <IndexArtbase />
    </Layout>
  )
}

export default Home

const TempSymposium = styled.section`
  height: 80vh;
  position: relative;
  background: #00fe28;

  @media screen and (min-width: 940px) {
    height: calc(100vh - 36px);
    /* height: calc(100vh - 0); */
  }

  .symposium-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .symposium-link {
    /* position: absolute; */
    margin-top: auto;
    bottom: 1rem;
    /* z-index: 666; */
    display: block;
  }

  img {
    width: 100%;
    padding: 3rem 1rem;
  }

  h2 {
    margin: 0 0 2rem 1rem;
    font-size: 2rem;
    @media screen and (min-width: 940px) {
      text-align: center;
    }
  }
`
