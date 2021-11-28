import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import parse from "html-react-parser"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import ImgSymposium from "../assets/ada-sym-green.gif"

const ArtbaseIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout>
        <Seo title="Artbase" />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title="Artbase" />
      <Artbase>
        {posts.map(post => {
          const { title, excerpt, date, uri } = post

          const { nodes: tags } = post.tags

          const altText = post.featuredImage?.node?.altText

          const featuredImage = {
            fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
            alt: altText !== "" ? altText : post.title,
          }

          return (
            <li key={uri}>
              {featuredImage?.fluid && (
                <Link to={uri} itemProp="url">
                  <Image
                    fluid={featuredImage.fluid}
                    alt={featuredImage.alt}
                    style={{ width: "100%" }}
                  />
                </Link>
              )}

              <div className="artbase-info">
                <h2>
                  <Link to={uri} itemProp="url">
                    <span itemProp="headline">{parse(title)}</span>
                  </Link>
                </h2>

                <div itemProp="description" className="artbase-excerpt">
                  {parse(excerpt)}
                </div>
                <small className="artbase-date">{date}</small>

                <div className="artbase-tags">
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <Link to={tag.link} className="artbase-tag" key={index}>
                          {tag.name} {index !== tags.length - 1}
                        </Link>
                      )
                    })}
                </div>
              </div>
            </li>
          )
        })}
      </Artbase>

      <ArtbaseNav>
        {previousPagePath && <Link to={previousPagePath}>⇐</Link>}
        {nextPagePath && <Link to={nextPagePath}>⇒</Link>}
      </ArtbaseNav>
    </Layout>
  )
}

export default ArtbaseIndex

const Artbase = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  @media screen and (min-width: 940px) {
    grid-template-columns: 1fr 1fr;
  }

  .gatsby-image-wrapper {
    max-height: calc(100vh - 38px);
  }

  li {
    margin-bottom: 0;
    border-bottom: 1px solid var(--color-primary);
    @media screen and (min-width: 940px) {
      border: 1px solid var(--color-primary);
      display: flex;
      flex-direction: column;
      &:nth-child(even) {
        flex-direction: column-reverse;
      }
    }
  }

  h2 {
    margin: 0 0 0.8rem;
  }

  .artbase {
    &-date {
      display: inline-block;
      margin-top: 1rem;
    }

    &-info {
      padding: 1.4rem 1.4rem 2rem;
      position: relative;
    }

    &-excerpt {
      max-width: 69ch;
    }

    &-nav {
      background: black;
    }

    &-tags {
      margin-top: 2.6rem;
      margin-bottom: 0.6rem;
    }

    &-tag {
      display: inline-block;
      text-transform: uppercase;
      font-size: 0.6rem;
      /* border: 1px solid black; */
      background: black;
      padding: 0.4rem 0.8rem;
      margin: 0 0.2rem 0.2rem 0;

      &:hover {
        color: var(--color-primary-light);
      }
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
            link
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
