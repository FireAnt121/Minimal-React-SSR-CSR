import React, { useState } from "react"
import { Helmet } from "react-helmet-async"

export default function New() {
  const [test, setTest] = useState(false);
  return (
    <>
      <Helmet>
        <title>New - My Site</title>
        <meta name="description" content="Welcome to our blog" />
        <meta property="og:title" content="Blog - My Site" />
        <meta property="og:description" content="Welcome to our blog" />
      </Helmet>
      <div>
        New
        {JSON.stringify(test)}
      </div>

    </>
  )
}
