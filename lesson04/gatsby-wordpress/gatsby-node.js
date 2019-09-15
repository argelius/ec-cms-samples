/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

async function createPosts({ graphql, actions, reporter }) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  const posts = result.data.allWordpressPost.edges.map(x => x.node);

  posts.forEach(({ slug }) => {
    createPage({
      path: `/posts/${slug}`,
      component: path.resolve(`./src/components/post-page-layout.js`),
      context: { slug }
    });
  });
}

async function createPagination({ graphql, actions, reporter }) {
  const { createPage } = actions;

  const postsPerPage = 4;

  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  

  const nbrOfPosts = result.data.allWordpressPost.edges.length;
  const nbrOfPages = Math.ceil(nbrOfPosts / postsPerPage);

  for (let i = 1; i < nbrOfPages + 1; i += 1) {
    const limit = postsPerPage;
    const skip = (i - 1) * postsPerPage;

    createPage({
      path: `/page/${i}`,
      component: path.resolve(`./src/components/index-page-layout.js`),
      context: {
        skip,
        limit,
        page: i,
        nbrOfPages,
      }
    });
  }
}

exports.createPages = async (...args) => {
  await createPosts(...args);
  await createPagination(...args);
}
