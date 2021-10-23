import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import styled from "styled-components"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const { nodes: tags } = post.tags

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <Post
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              className="hero-image"
            />
          )}

          <div className="hero-content">
            <Link href="#content">
              <h1 itemProp="headline">{parse(post.title)}</h1>
            </Link>
            {tags &&
              tags.map((tag, index) => {
                console.log(tag.link)
                return (
                  <Link to={tag.link} className="tag" key={index}>
                    {tag.name} {index !== tags.length - 1}
                  </Link>
                )
              })}
          </div>

          {/* <p>{post.date}</p> */}
        </header>

        {!!post.content && (
          <section itemProp="articleBody" id="content">
            {parse(post.content)}
          </section>
        )}
      </Post>

      <PostNav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ⇐ {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} ⇒
              </Link>
            )}
          </li>
        </ul>
      </PostNav>
    </Layout>
  )
}

const Post = styled.article`
  position: relative;

  strong {
    font-variation-settings: "wdth" 120;
  }

  header {
    @media screen and (min-width: 940px) {
      max-height: calc(100vh - 38px);
      overflow-y: hidden;
      position: relative;
    }
  }

  .hero-image {
    max-width: 100%;
  }

  h1 {
    color: var(--color-primary);
    transition: color 300ms;

    &:hover {
      color: var(--color-primary-light);
    }
  }

  .hero-content {
    color: var(--color-primary);
    background: black;
    padding: 1.6rem 0.8rem 0.8rem;
    margin-top: -2px;

    .tag {
      display: inline-block;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 0.4rem 0.8rem;
      margin: 0 0.4rem 0.4rem 0;
      color: var(--color-primary-light);
      background-color: var(--color-primary-dark);
      border-radius: 2rem;

      transition: color 300ms, background 300ms;

      &:hover {
        color: var(--color-primary-dark);
        background-color: var(--color-primary-light);
      }
    }

    @media screen and (min-width: 940px) {
      position: absolute;
      padding: 1.6em 2.6em 1rem;
      bottom: 0;
      left: 0;
    }
  }

  section {
    margin: 0 auto;
    padding: 0.8rem;
    @media screen and (min-width: 940px) {
      padding-top: 2rem;
      max-width: 700px;
    }

    .gatsby-image-wrapper {
      width: 100% !important;
    }
  }
`

const PostNav = styled.nav`
  background: black;

  ul {
    margin: 0;
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    list-style: none;
    padding: 1rem;
    gap: 1rem;
  }

  li {
    margin: 0;
  }

  a {
    height: 100%;
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
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      tags {
        nodes {
          id
          name
          link
        }
      }
      date(formatString: "MMMM DD, YYYY")

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
