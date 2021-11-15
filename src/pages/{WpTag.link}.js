import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import TagsList from "../components/tagsList"

const TagPage = ({ data }) => {
  const { name } = data.wpTag
  return (
    <Layout>
      <TagPageContainer>
        <div className="tag-page__title">
          <h1>
            Artbase tag == <span>{name}</span>
          </h1>
        </div>
        <TagsList name={name} />
      </TagPageContainer>
    </Layout>
  )
}

const TagPageContainer = styled.section`
  /* background: blue; */
  .tag-page__title {
    background: black;
    padding: 1rem;
  }

  h1 {
    color: var(--color-primary);
    font-size: 2rem;
    margin: 0.6rem 0;

    @media screen and (min-width: 880px) {
      text-align: left;
      font-size: 4rem;
    }

    span {
      text-transform: capitalize;
    }
  }
`

export const query = graphql`
  query GetSingleTag($link: String = "") {
    wpTag(link: { eq: $link }) {
      slug
      name
      link
      id
    }
  }
`

export default TagPage
