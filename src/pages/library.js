import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Image from "gatsby-image"

const Library = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Seo title="Library" />
      <LibraryTitle>
        <h1>Library</h1>
      </LibraryTitle>
      <LibraryCollection>
        {data.allWpPost.nodes.map((post, index) => {
          const altText = post.featuredImage?.node?.altText

          const featuredImage = {
            fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
            alt: altText !== "" ? altText : post.title,
          }

          return (
            <Link to={post.uri} key={index}>
              <Image
                fluid={featuredImage.fluid}
                alt={featuredImage.alt}
                style={{ marginBottom: 50, width: "100%" }}
              />
              <div className="info">
                <h2>{post.title}</h2>
                <p>{post.date}</p>
              </div>
            </Link>
          )
        })}
      </LibraryCollection>
    </Layout>
  )
}

const LibraryTitle = styled.div`
  background: black;
  padding: 1rem;

  h1 {
    color: var(--color-primary);
  }
`

const LibraryCollection = styled.section`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(2, 1fr);
  background: var(--color-primary-dark);

  @media screen and (min-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
  }

  h2 {
    font-size: 1.2rem;
    margin: 0 0 0.4rem 0;

    @media screen and (min-width: 880px) {
      font-size: 2.4rem;
    }
  }

  a {
    transition: background 3000ms ease-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;

    &:hover {
      background: var(--color-primary-light);
    }

    &:nth-child(even) {
      flex-direction: column-reverse;
    }
  }

  .gatsby-image-wrapper {
    margin-bottom: 0 !important;
  }

  .info {
    padding: 1.2rem 2rem 0.8rem 0.8rem;
    /* background: black; */
  }
`

export const query = graphql`
  query LibraryPostsQuery {
    allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { name: { eq: "Library" } } } }
      }
    ) {
      nodes {
        id
        title
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
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
