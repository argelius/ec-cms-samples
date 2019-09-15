import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const FruitPage = ({ data }) => {
  const fruit = data.fruitsJson;

  return (
    <Layout>
      <SEO title={`Fruits - ${fruit.name}`} />
      <h1>{fruit.name}</h1>
      <p>{fruit.description}</p>
    </Layout>
  );
}

export default FruitPage

export const query = graphql`
  query($name: String) {
    fruitsJson(name: { eq: $name }) {
      name
      description
    }
  }
`
