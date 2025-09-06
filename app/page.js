import { getAllBlogPosts, getPerson, getAsset } from '../lib/contentful'
import Layout from '../src/components/layout-next'
import Hero from '../src/components/hero-next'
import ArticlePreview from '../src/components/article-preview-next'

export default async function HomePage() {
  try {
    const posts = await getAllBlogPosts()
    const author = await getPerson('15jwOBqpxqSAOy2eOO4S0m')
    
    // Get logo from Contentful
    const logo = await getAsset('7czINe9HAu90wBzrc8Athc')
    const logoUrl = logo?.fields?.file?.url ? `https:${logo.fields.file.url}` : null

    return (
      <Layout logoUrl={logoUrl}>
        <Hero
          image={author?.fields?.image}
          title={author?.fields?.name}
          content={author?.fields?.shortBio}
        />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    return (
      <div>
        <h1>Milwaukee Garden District Neighborhood Association</h1>
        <p>Loading content...</p>
        <p>Error: {error.message}</p>
      </div>
    )
  }
}