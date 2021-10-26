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
                {/* <Link
                  to={post.uri}
                  itemProp="url"
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                > */}
                {featuredImage?.fluid && (
                  <Link to={post.uri} itemProp="url">
                    <Image
                      fluid={featuredImage.fluid}
                      alt={featuredImage.alt}
                      style={{ width: "100%" }}
                    />
                  </Link>
                )}

                <div className="artbase-info">
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>

                  <div className="artbase-tags">
                    {tags &&
                      tags.map((tag, index) => {
                        return (
                          <span className="artbase-tag">
                            {tag.name} {index !== tags.length - 1 && ""}
                          </span>
                        )
                      })}
                  </div>

                  <div itemProp="description" className="artbase-excerpt">
                    {parse(post.excerpt)}
                  </div>
                  <small className="artbase-date">{post.date}</small>
                </div>
                {/* </Link> */}
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

  /* li:first-child,
  li:last-child {
    grid-column: 1 / -1;
  } */

  /* a {
    color: black;
    display: block;
    margin-top: 0;
    &:hover {
      color: black;
    }
  } */

  h2 {
    margin: 0 0 0.8rem;
  }

  .artbase {
    &-date {
      display: inline-block;
      margin-top: 1rem;
    }

    &-info {
      padding: 1.4rem 1.4rem 2.6rem;
      position: relative;
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

    &-tags {
      margin-bottom: 0.6rem;
    }

    &-tag {
      display: inline-block;
      text-transform: uppercase;
      font-size: 0.6rem;
      border: 1px solid black;
      padding: 0.4rem 0.8rem;
      margin: 0 0.2rem 0.2rem 0;
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
