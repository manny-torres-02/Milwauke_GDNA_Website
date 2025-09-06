import { getDownloadableFile } from '../../lib/contentful'
import Layout from '../../src/components/layout-next'
import Container from '../../src/components/container'

export const metadata = {
  title: 'Resources | Milwaukee Garden District Neighborhood Association',
  description: 'Download helpful resources and forms from the Milwaukee Garden District Neighborhood Association.',
}

export default async function ResourcesPage() {
  const downloadableFile = await getDownloadableFile('7ccLyl6t3VzHl2qcKvSyRZ')

  return (
    <Layout>
      <Container>
        <section>
          <h1>Miscellaneous Links for download</h1>
          <ul>
            {downloadableFile && downloadableFile.fields.downloadableFile && (
              <li>
                <a
                  href={`https:${downloadableFile.fields.downloadableFile.fields.file.url}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {downloadableFile.fields.fileDescription || 'Download the 2025 Garden Application'}
                </a>
              </li>
            )}
          </ul>
        </section>
      </Container>
    </Layout>
  )
}