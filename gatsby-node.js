const fs = require('fs');
const path =require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const _ = require('lodash');

// 为markdown graphql数据源添加我们额外需要的信息
exports.onCreateNode = async ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        // /React18/Automatic Batching.md -> /React18/Automatic Batching/
        const slug = createFilePath({ node, getNode }).replace(/\/$/, '');
        const { fileAbsolutePath, frontmatter } = node;

        let {mtime, ctime} = fs.statSync(fileAbsolutePath);

        // 托管在git上的文档以提交的时间为准
        if (fs.existsSync(path.join(__dirname, 'docs', '.git'))) {
            const lastCommitTime = execSync(`cd docs && git log --pretty=%ai '${fileAbsolutePath}' | head -1`).toString() || '';
            const firstCommitTime = execSync(`cd docs && git log --pretty=%ai '${fileAbsolutePath}' | tail -1`).toString() || '';

            lastCommitTime && (mtime = new Date(lastCommitTime));
            firstCommitTime && (ctime = new Date(firstCommitTime));
        }

        // 获取去除后缀的文件名
        const filename = path.basename(fileAbsolutePath, path.extname(fileAbsolutePath));
        const title = frontmatter.title || filename;
        const pathname = `${slug.replace(/[^\/]+$/, '')}${title}`;

        const fields = [
            {name: 'title', value: title},
            {name: 'pathname', value: pathname},
            {name: 'createTime', value: ctime},
            {name: 'updateTime', value: mtime}
        ];

        fields.forEach(field => {
            const {name, value} = field;
            createNodeField({node, name, value})
        });
    }
};

// 遍历所有的markdown graphql数据，由此生成页面
exports.createPages = ({ actions, graphql }) => {
    const defaultTemplate = require.resolve(`./src/templates/default.tsx`);

    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            title,
                            pathname,
                            createTime,
                            updateTime
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
            edges.forEach(({ node }) => {
                const {title, pathname, createTime, updateTime} = node.fields;

                actions.createPage({
                    path: pathname,
                    component: defaultTemplate,
                    context: {
                        title,
                        createTime,
                        updateTime,
                        pathname
                    }
                });
            });
            return Promise.resolve();
        }
    });
}
