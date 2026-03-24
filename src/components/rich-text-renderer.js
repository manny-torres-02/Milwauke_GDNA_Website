import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Image from 'next/image'

const RichTextRenderer = ({ document, links }) => {
  if (!document) {
    return null
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        // Prefer REST shape if present
        let title
        let url
        let width
        let height

        if (node?.data?.target?.fields) {
          const { file, title: restTitle } = node.data.target.fields
          title = restTitle
          url = file?.url
          const details = file?.details
          width = details?.image?.width
          height = details?.image?.height
        } else if (links && node?.data?.target?.sys?.id) {
          // GraphQL Rich Text: resolve via links.assets.block
          const targetId = node.data.target.sys.id
          const asset = links?.assets?.block?.find(
            (a) => a?.sys?.id === targetId
          )
          if (asset) {
            title = asset.title
            url = asset.url
            width = asset.width
            height = asset.height
          }
        }

        if (!url || !width || !height) return null

        const normalizedUrl = url.startsWith('//') ? `https:${url}` : url
        // Use higher quality URL with Contentful's image transformation
        const highQualityUrl = `${normalizedUrl}?fm=webp&q=90&w=${Math.min(
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
