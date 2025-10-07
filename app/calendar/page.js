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
        <div className="calendar-container">
          <h1>Calendar currently unavailable</h1>
          <p>Please check back later for our community calendar.</p>
        </div>
      </Layout>
    )
  }

  const { calendarPdf } = calendar.fields

  return (
    <Layout>
      <div className="calendar_container">
        <h1>Community Calendar</h1>
        <p>
          View our community calendar below. You can download it by
          right-clicking and selecting "Save as..."
        </p>

        <div
          className=""
          style={{
            width: '100%',
            height: '800px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            marginTop: '20px',
            // margin: 'auto',
          }}
        >
          <iframe
            src={`https:${calendarPdf.fields.file.url}`}
            title={calendarPdf.fields.title || 'Community Calendar'}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a
            href={`https:${calendarPdf.fields.file.url}`}
            download="calendar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#007cba',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
            }}
          >
            📥 Download Calendar
          </a>
        </div>
      </div>
    </Layout>
  )
}
