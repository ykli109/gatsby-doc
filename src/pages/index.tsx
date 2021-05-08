/*
 * @file: file
 * @author: 首页
 */
import * as React from "react"
import { Link, graphql } from "gatsby"
import _ from 'lodash';

export const pageQuery = graphql`
  {
    allMarkdownRemark {
        edges {
          node {
            fields {
              pathname,
              title
            }
          }
        }
    }
  }
`

type LinkParams = {path: string; title: string;}

const IndexPage = ({ data }: { data: ObjectType }) => {
  const {edges = []} = data.allMarkdownRemark;

  const links: Array<LinkParams> = edges.map(({ node }: any) => ({
    path: node.fields.pathname,
    title: node.fields.title
  }));

  return (
    <main>
      <h1>参考文档</h1>
      {links.map(link => <p key={link.path}><Link to={link.path}>{link.title}</Link></p>)}
    </main>
  )
}

export default IndexPage
