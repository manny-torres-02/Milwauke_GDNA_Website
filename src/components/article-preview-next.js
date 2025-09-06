import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles['article-list']}>
        {posts.map((post) => {
          const slug = post.fields?.slug || post.slug
          const title = post.fields?.title || post.title
          const publishDate = post.fields?.publishDate || post.publishDate
          const tags = post.fields?.tags || post.tags
          const heroImage = post.fields?.heroImage || post.heroImage
          const description = post.fields?.description || post.description
          
          // Convert rich text description to plain text
          const plainDescription = description && typeof description === 'object'
            ? documentToPlainTextString(description)
            : description

          return (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className={styles.link}>
                {heroImage && heroImage.fields && (
                  <Image
                    src={`https:${heroImage.fields.file.url}`}
                    alt={title || 'Blog post image'}
                    width={424}
                    height={212}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                )}
                <h2 className={styles.title}>{title}</h2>
              </Link>
              <div>
                {plainDescription && (
                  <p>{plainDescription}</p>
                )}
              </div>
              <div className={styles.meta}>
                <small className="meta">
                  {publishDate && new Date(publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </small>
                <Tags tags={tags} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview