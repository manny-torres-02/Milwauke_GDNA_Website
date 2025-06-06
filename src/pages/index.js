import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import ReactGA from 'react-ga4'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import '../components/index.css'
import paypalQRCode from '../assets/mgdna_paypal_QR_Code.png'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    ReactGA.initialize('G-839RLFWWPC')
    // ReactGA.pageview(window.location.pathname + window.location.search)

    return (
      <Layout location={this.props.location}>
        <Hero
          image={author.heroImage.gatsbyImage}
          title={author.name}
          content={author.shortBio}
        />

        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

// TODO: Line 51 - is the QUERY for the HEro Image - it is attached to person.
export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      nodes {
        name
        shortBio {
          raw
        }
        title
        heroImage: image {
          gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
        }
      }
    }
  }
`
