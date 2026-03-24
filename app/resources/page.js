import { getAllDownloadableFiles } from '../../lib/contentful'
import Layout from '../../src/components/layout-next'
import Container from '../../src/components/container'

export const metadata = {
  title: 'Resources | Milwaukee Garden District Neighborhood Association',
  description:
    'Download helpful resources and forms from the Milwaukee Garden District Neighborhood Association.',
}

export default async function ResourcesPage() {
  const files = await getAllDownloadableFiles()

  return (
    <Layout>
      <Container>
        <section>
          <h1>Miscellaneous Links for download</h1>
          {(!files || files.length === 0) && (
            <p>No downloadable resources available at the moment.</p>
          )}
          {files && files.length > 0 && (
            <ul>
              {files.map((item) => {
                const url = item.fields?.downloadableFile?.fields?.file?.url
                const label = item.fields?.fileDescription || 'Download'
                if (!url) return null
                return (
                  <li key={item.sys.id}>
                    <a
                      href={`https:${url}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </Container>
    </Layout>
  )
}
