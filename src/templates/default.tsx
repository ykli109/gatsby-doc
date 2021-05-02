import React from "react";
import { graphql } from "gatsby";
import _ from 'lodash';
import moment from 'moment';

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug }}) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                slug
                title
            }
        }
    }
`

export default function DefaultTemplate({
    data
}: TemplateProps) {
    const frontmatter = _.get(data, 'markdownRemark.frontmatter', { title: '未设置标题', date: moment(new Date()).format('YYYY-MM-DD') });
    const html = _.get(data, 'markdownRemark.html', '');

    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    )
}
