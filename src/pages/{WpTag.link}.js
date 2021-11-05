import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagsList from "../components/tagsList"

const WpTag = ({ data }) => {
  const { slug, name, link, id } = data.wpTag
  return (
    <Layout>
      <section>
        <h1>Show all posts with the tag: {name}</h1>
        <TagsList name={name} />
      </section>
    </Layout>
  )
}

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

export default WpTag
