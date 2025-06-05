
import React from "react"
import { Helmet } from "react-helmet-async"

export default function Blog() {
  return (<>
    <Helmet>
      <title>Blog - My Site</title>
      <meta name="description" content="Welcome to our blog" />
      <meta property="og:title" content="Blog - My Site" />
      <meta property="og:description" content="Welcome to our blog" />
    </Helmet>
    <div>
      Blog
    </div>
  </>
  )
}
