import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="All posts" />
      <>
        <ol style={{ listStyle: `none`, padding: "0 1rem" }}>
          {posts.map(post => {
            const title = post.title
            const { nodes: tags } = post.tags

            const featuredImage = {
              fluid:
                post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
              alt: post.featuredImage?.node?.alt || ``,
            }

            console.log(featuredImage)

            return (
              <li key={post.uri}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.uri} itemProp="url">
                        <span itemProp="headline">{parse(title)}</span>
                      </Link>
                    </h2>

                    <small>{post.date}</small>

                    <div>
                      {tags &&
                        tags.map((tag, index) => {
                          return (
                            <span>
                              {tag.name} {index !== tags.length - 1 && "/ "}
                            </span>
                          )
                        })}
                    </div>
                  </header>

                  {featuredImage?.fluid && (
                    <Link to={post.uri} itemProp="url">
                      <Image
                        fluid={featuredImage.fluid}
                        alt={featuredImage.alt}
                        style={{ marginBottom: 50, width: "100%" }}
                      />
                    </Link>
                  )}

                  <section itemProp="description">
                    {parse(post.excerpt)}
                  </section>
                </article>
              </li>
            )
          })}
        </ol>

        <div
          style={{
            padding: `1rem`,
            display: `flex`,
            justifyContent: `space-between`,
          }}
        >
          {previousPagePath && (
            <div>
              <Link to={previousPagePath}>⇐ Previous</Link>
              <br />
            </div>
          )}
          {nextPagePath && <Link to={nextPagePath}>Next ⇒</Link>}
        </div>
      </>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        tags {
          nodes {
            id
            name
          }
        }
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
  }
`
