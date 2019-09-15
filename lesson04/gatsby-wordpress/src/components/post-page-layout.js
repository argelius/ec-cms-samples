import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const PostPage = ({ data }) => {
  const post = data.wordpressPost;

  return (
    <Layout>
      <SEO title={post.title} />
      <article>
        <h1>{post.title}</h1>
        <main dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export default PostPage

export const query = graphql`
  query($slug: String) {
    wordpressPost(slug: { eq: $slug }) {
      title
      content
    }
  }
`
