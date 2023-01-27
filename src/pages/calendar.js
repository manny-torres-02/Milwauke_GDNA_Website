import * as React from 'react'
import Layout from '../components/layout'
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
      }`)
    return (
        <Layout>
      <div className="about-container">
        {data.contentfulCalendar.calendarPdf.title}
       <h1>hello</h1> 
       <img src={data.contentfulCalendar.calendarPdf.file.url}/>
       <h3> {data.contentfulCalendar.calendarPdf.description}</h3>
      </div>
      </Layout>
    )
  }
  
  export default Calendar