import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
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
    <div className="tag-list__container">
      {filteredPosts &&
        filteredPosts.map(
          ({ id, title, excerpt, featuredImage, uri, date }) => {
            const image = {
              fluid: featuredImage?.node?.localFile?.childImageSharp?.fluid,
              alt: featuredImage?.node?.alt || ``,
            }

            return (
              <Link to={uri} className="tag-list__post" key={id}>
                {title && <h2>{title}</h2>}
                {date && <p>{date}</p>}
                {featuredImage && (
                  <Image
                    fluid={image.fluid}
                    alt={image.alt}
                    style={{ marginBottom: 50, width: "100%" }}
                  />
                )}
                {excerpt && (
                  <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                )}
              </Link>
            )
          }
        )}
    </div>
  )
}

export default TagsList
