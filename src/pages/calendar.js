import * as React from 'react'
import Layout from '../components/layout'
import '../components/calendar.css'
import { graphql, useStaticQuery } from 'gatsby'

const Calendar = ({}) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      contentfulCalendar {
        calendarPdf {
          title
          file {
            url
          }
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <div className="calendar-container">
        {/* {data.contentfulCalendar.calendarPdf.title}
       <h1>hello</h1>  */}
        <h1 className="calendar_link">
          <a
            href={data.contentfulCalendar.calendarPdf.file.url}
            download="Calendar"
          >
            Download our calendar
          </a>
        </h1>

        <img src={data.contentfulCalendar.calendarPdf.file.url} />
      </div>
    </Layout>
  )
}

export default Calendar
