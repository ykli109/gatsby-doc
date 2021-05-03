import React from "react";
import { graphql } from "gatsby";
import _ from 'lodash';
import moment from 'moment';

export const pageQuery = graphql`
    query($pathname: String!) {
        markdownRemark(fields: { pathname: { eq: $pathname }}) {
            html
        }
    }
`

export default function DefaultTemplate({
    data,
    pageContext
}: TemplateProps) {
    console.log(data);
    const html = _.get(data, 'markdownRemark.html', '');
    const {title, createTime} = pageContext;

    return (
        <div>
            <h1>{title}</h1>
            <h2>创建时间：{moment(createTime).format('YYYY-MM-DD')}</h2>
            <div dangerouslySetInnerHTML={{ __html: html }}/>
        </div>
    )
}
