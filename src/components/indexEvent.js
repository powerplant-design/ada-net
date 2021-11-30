import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import styled from "styled-components"

const IndexEvent = () => {
  const data = useStaticQuery(graphql`
    {
      wpPost(id: { eq: "cG9zdDo2OTg1" }) {
        id
        title
        excerpt
        uri
        excerpt
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 2000, quality: 60) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  `)

  //   console.log(data.wpPost)

  const altText = data.wpPost.featuredImage?.node?.altText

  const featuredImage = {
    fluid: data.wpPost.featuredImage?.node?.localFile?.childImageSharp.fluid,
    alt: altText !== "" ? altText : data.wpPost.title,
  }

  return (
    <IndexEventContent>
      <div className="container">
        <div className="info">
          <h4>—Upcoming Event</h4>
          <h2>{data.wpPost.title}</h2>
          <p>{parse(data.wpPost.excerpt)}</p>
          <Link to={data.wpPost.uri} key={data.wpPost.id}>
            —READ ON
          </Link>
          <Link to="/events/">—OTHER EVENTS</Link>
        </div>
        <Image
          fluid={featuredImage.fluid}
          alt={featuredImage.alt}
          style={{ width: "100%" }}
          className="image"
        />
      </div>
    </IndexEventContent>
  )
}

export default IndexEvent

const IndexEventContent = styled.section`
  h2 {
    font-size: 2rem;
    @media screen and (min-width: 940px) {
      font-size: 3.6rem;
    }
  }

  .container {
    color: black;
    display: grid;
    /* align-content: center; */
    min-height: 100vh;

    @media screen and (min-width: 940px) {
      grid-template-columns: 1fr 1fr;
    }

    .info {
      padding: 1rem 15% 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }

  .image {
    grid-row: 1;
    @media screen and (min-width: 940px) {
      grid-row: unset;
    }
  }
`
