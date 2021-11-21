import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import parse from "html-react-parser"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import ImgSymposium from "../assets/ada-sym-green.gif"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="Artbase" />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="Artbase" />
      <TempSymposium>
        <div className="symposium-container">
          <img src={ImgSymposium}></img>
          <Link
            className="symposium-link"
            to="http://localhost:8000/symposium2021/call-for-participation-ada-symposium-poneke-wellington-indeterminate-infrastructures-objects-signals-and-architectures/"
          >
            <h2>ADA.NET Pōneke/Wellington symposium 2021</h2>
          </Link>
        </div>
      </TempSymposium>

      <Artbase>
        {posts.map(post => {
          const { title, excerpt, date, uri } = post

          const { nodes: tags } = post.tags

          const featuredImage = {
            fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
            alt: post.featuredImage?.node?.altText || ``,
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

                <div itemProp="description" className="artbase-excerpt">
                  {parse(excerpt)}
                </div>
                <small className="artbase-date">{date}</small>
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

export default BlogIndex

const TempSymposium = styled.section`
  height: 100vh;
  position: relative;
  /* background: #75f954; */
  background: #00fe28;

  @media screen and (min-width: 940px) {
    height: calc(100vh - 36px);
  }

  .symposium-link {
    position: absolute;
    bottom: 1rem;
    z-index: 666;
    display: block;
  }

  img {
    width: 100%;
    padding: 3rem 1rem;
  }

  h2 {
    margin: 0 0 2rem 1rem;
    @media screen and (min-width: 940px) {
      text-align: center;
    }
  }
`

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
