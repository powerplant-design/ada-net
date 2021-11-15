import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Image from "gatsby-image"

const Events = ({ data }) => {
  return (
    <Layout>
      <Seo title="Events" />
      <EventsCollection>
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
              <div className="events-list__post-info">
                <h2>{post.title}</h2>
                <p>{post.date}</p>
              </div>
            </Link>
          )
        })}
      </EventsCollection>
    </Layout>
  )
}

const EventsCollection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

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
    border: 1px solid var(--color-primary-dark);
    transition: background 3000ms ease-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      background: var(--color-primary-light);
    }
  }

  .gatsby-image-wrapper {
    margin-bottom: 0 !important;
  }

  .events-list__post-info {
    padding: 1.2rem 2rem 0.8rem 0.8rem;
    /* background: black; */
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

export default Events
