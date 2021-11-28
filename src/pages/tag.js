import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

const Tag = ({ data }) => {
  const tags = data.allWpTag.nodes

  return (
    <Layout>
      <TagsList>
        {tags.map((tag, index) => {
          return (
            <Link to={tag.link} key={index}>
              {tag.name}
            </Link>
          )
        })}
      </TagsList>
    </Layout>
  )
}

const TagsList = styled.section`
  background: black;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  @media only screen and (min-width: 880px) {
    grid-template-columns: repeat(8, 1fr);
  }
  /* gap: 1rem; */

  a {
    color: white;
    background: black;
    text-transform: uppercase;
    padding: 0.8rem 1rem;
    transition: color 700ms, background 700ms;

    &:hover {
      color: black;
      background: var(--color-primary-light);
    }
  }
`

export const query = graphql`
  {
    allWpTag {
      nodes {
        name
        link
        id
        slug
      }
    }
  }
`

export default Tag
