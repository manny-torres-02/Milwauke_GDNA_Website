import { getAllBlogPosts } from '../../lib/contentful'
import Layout from '../../src/components/layout-next'
import Hero from '../../src/components/hero-next'
import ArticlePreview from '../../src/components/article-preview-next'

export const metadata = {
  title: 'Blog | Milwaukee Garden District Neighborhood Association',
  description: 'Read the latest news and updates from the Milwaukee Garden District Neighborhood Association.',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <Layout>
      <Hero title="Blog" />
      <ArticlePreview posts={posts} />
    </Layout>
  )
}