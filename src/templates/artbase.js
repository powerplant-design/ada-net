import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
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
        <Artbase>
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
                <Link
                  to={post.uri}
                  itemProp="url"
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  {featuredImage?.fluid && (
                    // <Link to={post.uri} itemProp="url">
                    <Image
                      fluid={featuredImage.fluid}
                      alt={featuredImage.alt}
                      style={{ width: "100%" }}
                    />
                    // </Link>
                  )}

                  <div className="artbase-info">
                    <small>{post.date}</small>

                    <h2>
                      {/* <Link to={post.uri} itemProp="url"> */}
                      <span itemProp="headline">{parse(title)}</span>
                      {/* </Link> */}
                    </h2>

                    <div className="artbase-tags">
                      {tags &&
                        tags.map((tag, index) => {
                          return (
                            <span>
                              {tag.name} {index !== tags.length - 1 && "/ "}
                            </span>
                          )
                        })}
                    </div>

                    <div itemProp="description" className="artbase-excerpt">
                      {parse(post.excerpt)}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </Artbase>

        <ArtbaseNav>
          {previousPagePath && <Link to={previousPagePath}>⇐</Link>}
          {nextPagePath && <Link to={nextPagePath}>⇒</Link>}
        </ArtbaseNav>
      </>
    </Layout>
  )
}

export default BlogIndex

const Artbase = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  @media screen and (min-width: 940px) {
    grid-template-columns: 1fr 1fr;
  }
  /* color: black; */

  .gatsby-image-wrapper {
    max-height: calc(100vh - 38px);
  }

  li {
    margin-bottom: 0;
    border-bottom: 1px solid var(--color-primary);
    @media screen and (min-width: 940px) {
      border: 1px solid var(--color-primary);
    }
  }

  li:first-child,
  li:last-child {
    grid-column: 1 / -1;
  }

  a {
    color: black;
    &:hover {
      color: black;
    }
  }

  .artbase {
    &-info {
      padding: 1rem;
      /* display: flex; */
      /* flex-wrap: wrap; */
      /* justify-content: space-between; */
    }

    &-excerpt {
      max-width: 69ch;
    }

    &-nav {
      background: black;
    }
  }
`

const ArtbaseNav = styled.nav`
  background: black;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 0.4rem;
  font-size: 2rem;

  a {
    line-height: 1;
    display: block;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    border-radius: 1rem;
    padding: 1rem;
    transition: color 300ms, border 300ms;

    &:hover {
      color: var(--color-primary-light);
      border: 1px solid var(--color-primary-light);
    }
  }

  a:last-child {
    margin-left: auto;
  }
`

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
      filter: {
        categories: { nodes: { elemMatch: { slug: { in: "artbase" } } } }
        title: { ne: "Contribute" }
      }
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
