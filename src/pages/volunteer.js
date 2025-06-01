import * as React from 'react'
import '../components/variables.css'
import '../components/global.css'
import '../components/volunteer.css'
import Layout from '../components/layout'
import Container from '../components/container'
import { graphql, useStaticQuery } from 'gatsby'
import paypalQRCode from '../assets/mgdna_paypal_QR_Code.png'

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
        <div class="donation">
          <div class="">
            <h1>Scan the below QR code to donate: </h1>
            <img class="paypalQRCode" src={paypalQRCode} />
          </div>
          <div>
            <h1>
              Or mail a check to: Garden District Neighborhood Association at
              P.O. Box 70876, Milwaukee WI 53207
            </h1>
          </div>
        </div>
        <img
          alt="Hero Photo, Hands"
          className="volunteer"
          src="https://cdn.pixabay.com/photo/2017/02/10/12/03/volunteer-2055015_1280.png"
        />
        {/* <p> {volunteerQuery.allContentfulAsset.edges.node.id} </p> */}
        {/* </div> */}
        <div className="">
          <h1>Volunteer With us</h1>

          {/* <h2>Save Winter Wonderland on 6th & Howard!</h2> */}
          <p>
            The Garden District Neighborhood Association is always welcoming
            volunteers.
            <br />
            <br />
            <p>
              The Garden District Neighborhood association has a need for
              volunteers.This volunteer group’s purpose is to bring the
              community together in order to maintain and improve the area,
              promote and facilitate fun activities, and develop community
              connections and financial stability. The opportunities that are
              available are garden maintenance, preparation, planting, the
              butterfly garden, grounds maintenance, History committee and
              events.
            </p>
            <p>Please ontact us below using the any of the following methods</p>
            <ul>
              <li>Let a Garden District Volunteer know you are interested.</li>
              <li> Call or text 414-379-2450.</li>
              <li>
                Email us at:
                <a href="mailto:info@milwaukeegdna.com">
                  info@milwaukeegdna.com
                </a>{' '}
              </li>
              <li>
                Contact us via Messenger or on Facebook at “Milwaukee’s Garden
                District.”
              </li>
            </ul>
            <br />
            <br />
            Garden District Neighborhood Association is a volunteer powered
            501(c)3 nonprofit organization.
            <br />
            <br />
            Milwaukee Garden District mailing address: P.O. Box 70876 Milwaukee,
            WI 53207
          </p>
          {/* {/*  */}

          {/* <h3> In Season Work Days</h3>
          <p>
            The gardening group volunteer days for 2023 will be Tuesdays from 9
            AM to 12 PM and Thursdays from 5PM to 8PM.{' '}
          </p> */}
          <h3>How To help?</h3>
          <p> Contact a board member at the below email with your interest. </p>
          <a href="mailto:info@milwaukeegdna.com">info@milwaukeegdna.com</a>
        </div>
      </Container>
    </Layout>
  )
}
export default Volunteer
