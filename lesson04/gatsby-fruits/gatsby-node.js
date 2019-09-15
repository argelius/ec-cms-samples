/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allFruitsJson {
        edges {
          node {
            name
          }
        }
      } 
    }
  `);

  const fruits = result.data.allFruitsJson.edges;

  fruits.forEach(({ node }) => {
    createPage({
      path: `/fruits/${node.name}`,
      component: path.resolve(`./src/components/fruit-page-layout.js`),
      context: { name: node.name },
    });
  });
};
