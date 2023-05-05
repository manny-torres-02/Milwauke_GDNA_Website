import * as React from 'react'
import '../components/variables.css'
import '../components/global.css'
import Layout from '../components/layout'
import Container from '../components/container'
import { graphql, useStaticQuery } from 'gatsby'

const Resources = () => {
    const resourceQuery = useStaticQuery(`graphql

    `
    )
    
    


  return (
    <Layout>
      <h1> HELLO </h1>
    </Layout>
  )
}

export default Resources
