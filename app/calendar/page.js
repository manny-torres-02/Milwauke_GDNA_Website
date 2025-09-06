import Image from 'next/image'
import { getCalendar } from '../../lib/contentful'
import Layout from '../../src/components/layout-next'
import '../../src/components/calendar.css'

export const metadata = {
  title: 'Calendar | Milwaukee Garden District Neighborhood Association',
  description: 'View and download our community calendar.',
}

export default async function CalendarPage() {
  const calendar = await getCalendar()
  
  if (!calendar || !calendar.fields.calendarPdf) {
    return (
      <Layout>
        <div className="about-container">
          <h1>Calendar currently unavailable</h1>
          <p>Please check back later for our community calendar.</p>
        </div>
      </Layout>
    )
  }

  const { calendarPdf } = calendar.fields

  return (
    <Layout>
      <div className="about-container">
        <h1 className="calendar_link">
          <a
            href={`https:${calendarPdf.fields.file.url}`}
            download="Calendar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download our calendar
          </a>
        </h1>
        <Image
          src={`https:${calendarPdf.fields.file.url}`}
          alt={calendarPdf.fields.title || 'Community Calendar'}
          width={800}
          height={600}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </Layout>
  )
}