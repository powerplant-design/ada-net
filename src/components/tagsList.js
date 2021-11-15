import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Image from "gatsby-image"

const TagsList = ({ name }) => {
  // Get all the posts and filter them by the tag we want
  // We should optimize this query by only asking graphql for the
  // post contian the tags

  const { allWpPost } = useStaticQuery(
    graphql`
      query WpPosts {
        allWpPost(sort: { fields: [date], order: DESC }) {
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
  )

  const filteredPosts = []
  allWpPost.nodes.map(post => {
    const tags = post.tags.nodes

    tags.forEach(tag => {
      if (tag.name === name) filteredPosts.push(post)
    })
  })

  return (
    // <div className="tag-list__container">
    <TagsListContainer>
      {filteredPosts &&
        filteredPosts.map(
          ({ id, title, excerpt, featuredImage, uri, date, tags }) => {
            const image = {
              fluid: featuredImage?.node?.localFile?.childImageSharp?.fluid,
              alt: featuredImage?.node?.alt || ``,
            }

            return (
              <Link to={uri} className="tag-list__post" key={id}>
                {featuredImage && (
                  <Image
                    fluid={image.fluid}
                    alt={image.alt}
                    // style={{ marginBottom: 50, width: "100%" }}
                  />
                )}
                <div className="tag-list__post-info">
                  {title && <h2>{title}</h2>}
                  {date && <p>{date}</p>}
                  {/* {excerpt && (
                  <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                )} */}
                </div>
              </Link>
            )
          }
        )}
    </TagsListContainer>
  )
}

const TagsListContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
  }

  h2 {
    font-size: 1.2rem;
    margin: 0 0 0.4rem 0;

    @media screen and (min-width: 880px) {
      font-size: 2.2rem;
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

  .tag-list__post {
    display: flex;

    &:nth-child(even) {
      flex-direction: column-reverse;
    }
  }

  .tag-list__post-info {
    padding: 0.8rem;
    @media screen and (min-width: 880px) {
      padding: 1.2rem 2rem 0.8rem 0.8rem;
    }
  }
`

export default TagsList
