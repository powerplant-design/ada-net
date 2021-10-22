import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
// import { GatsbyImage, getImage } from "gatsby-image"
import Image from "gatsby-image"

const Library = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <LibraryCollection>
        {data.allWpPost.nodes.map((post, index) => {
          const featuredImage = {
            fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
            alt: post.featuredImage?.node?.alt || ``,
          }
          return (
            <Link to={post.uri} key={index}>
              <Image
                fluid={featuredImage.fluid}
                alt={featuredImage.alt}
                style={{ marginBottom: 50, width: "100%" }}
              />
              <h2>{post.title}</h2>
            </Link>
          )
        })}
      </LibraryCollection>
    </Layout>
  )
}

const LibraryCollection = styled.section`
  /* background: blue; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* gap: 2rem; */

  a {
    border: 1px solid black;
    padding: 1rem;
    transition: background 300ms;
    &:hover {
      h2 {
        color: white;
      }
      background: var(--color-primary-dark);
    }
  }

  Image {
  }
`

export const query = graphql`
  query EventsPostsQuery {
    allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { name: { eq: "Events" } } } }
      }
    ) {
      nodes {
        id
        title
        excerpt
        uri
        tags {
          nodes {
            name
          }
        }
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
  }
`

export default Library
