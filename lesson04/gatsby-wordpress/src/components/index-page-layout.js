import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const PaginationPage = ({ data, pageContext }) => {
  const posts = data.allWordpressPost.edges.map(x => x.node);
  const pages = new Array(pageContext.nbrOfPages).fill(null).map((_, i) => i + 1);

  return (
    <Layout>
      <SEO title={`Page ${pageContext.page}`} />
      <h2>Page {pageContext.page}</h2>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            <span> - {new Date(post.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div>
        {pages.map(page => (
          <>
            <Link key={page} to={`/page/${page}`}>Page {page}</Link>
            <span>&nbsp;</span>
          </>
        ))}
      </div>
    </Layout>
  );
}

export default PaginationPage

export const query = graphql`
  query($skip: Int, $limit: Int) {
    allWordpressPost(
      limit: $limit,
      skip: $skip,
      sort: {
        fields: [date]
        order: DESC
      }
    ) {
      edges {
        node {
          slug
          title
          date
        }
      }
    }
  }
`
