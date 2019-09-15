import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data  = useStaticQuery(graphql`
    {
      allFruitsJson {
        edges {
          node {
            name
            description
          }
        }
      } 
    }
  `)

  const fruits = data.allFruitsJson.edges;

  return (
    <Layout>
      <SEO title="Home" />
      
      <p>Fruits I like:</p>
      <ul>
        {fruits.map(({ node: { name, description } }) => (
            <li key={name}><Link to={`/fruits/${name}`}>{name}</Link></li>
        ))}
      </ul>
    </Layout>
  );
}

export default IndexPage
