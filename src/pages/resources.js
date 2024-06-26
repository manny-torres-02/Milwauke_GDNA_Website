import * as React from 'react'
import '../components/variables.css'
import '../components/global.css'
import Layout from '../components/layout'
import Container from '../components/container'
import { graphql, useStaticQuery } from 'gatsby'

const Resources = () => {
  const resourceQuery = useStaticQuery(graphql`
    query resourceQuery {
      contentfulDownloadableFile(
        contentful_id: { eq: "7ccLyl6t3VzHl2qcKvSyRZ" }
      ) {
        contentful_id
        fileDescription
        downloadableFile {
          file {
            url
          }
        }
      }
    }
  `)

  console.log(resourceQuery)
  return (
    <Layout>
      <section>
        <h1> Miscellaneous Links for download </h1>
        <ul>
          <li>
            <a
              href={
                resourceQuery.contentfulDownloadableFile.downloadableFile.file
                  .url
              }
              download
            >
              Download the 2024 Garden Application
            </a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export default Resources
