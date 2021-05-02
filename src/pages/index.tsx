/*
 * @file: file
 * @author: 
 */
import * as React from "react"
import { Link } from "gatsby"

const IndexPage = () => {
  return (
    <main>
      <h1>Index Page</h1>
      <p><Link to="/docs/HTTP演进">HTTP演进</Link></p>
      <p><Link to="/docs/Vue中的核心概念">Vue核心概念</Link></p>
    </main>
  )
}

export default IndexPage
