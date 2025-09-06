import Link from 'next/link'
import { notFound } from 'next/navigation'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import readingTime from 'reading-time'

import { getBlogPost, getAllBlogSlugs } from '../../../lib/contentful'
import Layout from '../../../src/components/layout-next'
import Hero from '../../../src/components/hero-next'
import Tags from '../../../src/components/tags'
import * as styles from '../../../src/templates/blog-post.module.css'

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const plainTextDescription = post.fields.description 
    ? documentToPlainTextString(post.fields.description)
    : 'Read this blog post from the Milwaukee Garden District Neighborhood Association'

  return {
    title: `${post.fields.title} | Milwaukee Garden District Neighborhood Association`,
    description: plainTextDescription,
    openGraph: {
      title: post.fields.title,
      description: plainTextDescription,
      images: post.fields.heroImage ? [
        {
          url: `https:${post.fields.heroImage.fields.file.url}?w=1200&h=630&fit=fill`,
          width: 1200,
          height: 630,
        }
      ] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const { fields } = post
  const plainTextBody = fields.body 
    ? documentToPlainTextString(fields.body)
    : ''
  const { minutes: timeToRead } = readingTime(plainTextBody)

  // Convert rich text to plain text for display
  const bodyText = fields.body 
    ? documentToPlainTextString(fields.body)
    : 'Content will be displayed here.'

  return (
    <Layout>
      <Hero
        image={fields.heroImage}
        title={fields.title}
        content={fields.description}
      />
      <div className={styles.container}>
        <span className={styles.meta}>
          {fields.author?.fields?.name && `${fields.author.fields.name} · `}
          <time dateTime={fields.publishDate}>
            {fields.publishDate && new Date(fields.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {timeToRead > 0 && ` – ${timeToRead} minute read`}
        </span>
        <div className={styles.article}>
          <div className={styles.body}>
            <p>{bodyText}</p>
          </div>
          <Tags tags={fields.tags} />
          <nav>
            <ul className={styles.articleNavigation}>
              <li>
                <Link href="/blog">← Back to Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  )
}