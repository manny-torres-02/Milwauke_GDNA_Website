import React from 'react'
import Image from 'next/image'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import * as styles from './hero.module.css'

const Hero = ({ image, title, content }) => {
  // Convert Contentful rich text to plain text for display
  const plainTextContent = content && typeof content === 'object' 
    ? documentToPlainTextString(content) 
    : content

  return (
    <div className={styles.hero}>
      {image && image.fields && (
        <Image
          className={styles.image}
          src={`https:${image.fields.file.url}`}
          alt={title || 'Hero image'}
          width={1180}
          height={600}
          priority
          sizes="100vw"
        />
      )}
      {/* Uncomment when ready to display title and content */}
      {/* <div className={styles.details}>
        <h1 className={styles.title}>{title}</h1>
        {plainTextContent && (
          <div className={styles.content}>{plainTextContent}</div>
        )}
      </div> */}
    </div>
  )
}

export default Hero