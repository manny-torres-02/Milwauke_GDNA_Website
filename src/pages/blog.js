import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import ga4 from 'react-ga4'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  componentDidMount() {
    ga4.initialize('G-839RLFWWPC')
    // ga4.pageview(window.location.pathname + window.location.search)
  }
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    return (
      <Layout location={this.props.location}>
        <Seo title="Blog" />
        <Hero title="Blog" />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
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
  }
`
