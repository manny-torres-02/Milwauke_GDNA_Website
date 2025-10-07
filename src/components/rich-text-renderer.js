import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Image from 'next/image'

const RichTextRenderer = ({ document }) => {
  if (!document) {
    return null
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields
        const { url, details } = file
        const { width, height } = details.image

        // Use higher quality URL with Contentful's image transformation
        const highQualityUrl = `https:${url}?fm=webp&q=90&w=${Math.min(
          width,
          1200
        )}`

        return (
          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <Image
              src={highQualityUrl}
              alt={title || 'Blog image'}
              width={Math.min(width, 1200)}
              height={Math.round((Math.min(width, 1200) * height) / width)}
              quality={90}
              priority={false}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            {title && (
              <p
                style={{
                  fontSize: '0.9em',
                  color: '#666',
                  marginTop: '8px',
                  fontStyle: 'italic',
                }}
              >
                {title}
              </p>
            )}
          </div>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        // Handle embedded entries if needed
        return null
      },
    },
  }

  return documentToReactComponents(document, options)
}

export default RichTextRenderer
