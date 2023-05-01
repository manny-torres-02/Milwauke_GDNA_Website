import * as React from 'react'
import '../components/variables.css'
import '../components/global.css'
import Layout from '../components/layout'
import Container from '../components/container'
import { graphql, useStaticQuery } from 'gatsby'

const Volunteer = () => {
  const volunteerQuery = useStaticQuery(graphql`
    query volunteer {
      allContentfulAsset(
        filter: { contentful_id: { in: "6ZD53A085hHGR3ZVCmPjy8" } }
      ) {
        edges {
          node {
            id
            file {
              url
            }
          }
        }
      }
    }
  `)
  console.log(volunteerQuery)

  return (
    <Layout>
      <Container>
        {/* <div className=""> */}
        <img
          alt="Hero Photo, Hands"
          className="volunteer"
          src="https://cdn.pixabay.com/photo/2017/02/10/12/03/volunteer-2055015_1280.png"
        />
        {/* <p> {volunteerQuery.allContentfulAsset.edges.node.id} </p> */}
        {/* </div> */}
        <div className="">
          <h3>Volunteer With us</h3>
          <p>
            The Garden District Neighborhood association has a need for
            volunteers.This volunteer group’s purpose is to bring the community
            together in order to maintain and improve the area, promote and
            facilitate fun activities, and develop community connections and
            financial stability. The opportunities that are available are garden
            maintenance, preparation, planting, the butterfly garden, grounds
            maintenance, History committee and events.
          </p>
          <h3> In Season Work Days</h3>
          <p>
            {' '}
            The gardening group volunteer days for 2023 will be Tuesdays from 9
            AM to 12 PM and Thursdays from 5PM to 8PM.{' '}
          </p>
          <h3>
            How To help?
          </h3>
          <p> Contact a board member with your interest. </p>
        </div>
      </Container>
    </Layout>
  )
}
export default Volunteer
