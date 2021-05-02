const _ = require('lodash');

exports.createPages = ({ actions, graphql }) => {
    const defaultTemplate = require.resolve(`./src/templates/default.tsx`);

    graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }
        else {
            const edges = _.get(result, 'data.allMarkdownRemark.edges', []);
            return edges.forEach(({ node }) => {
                if (node.frontmatter.slug) {
                    actions.createPage({
                        path: node.frontmatter.slug,
                        component: defaultTemplate,
                        context: {
                            slug: node.frontmatter.slug
                        }
                    });
                }
            });
        }
    });
}
