import Image from 'next/image'
import Layout from '../../src/components/layout-next'
import Container from '../../src/components/container'
import paypalQRCode from '../../src/assets/mgdna_paypal_QR_Code.png'
import '../../src/components/volunteer.css'

export const metadata = {
  title:
    'Donate and Volunteer | Milwaukee Garden District Neighborhood Association',
  description:
    'Support the Milwaukee Garden District Neighborhood Association through donations and volunteering.',
}

export default function VolunteerPage() {
  return (
    <Layout>
      <Container>
        <div className="donation">
          <div className="">
            <h1>Scan the below QR code to donate:</h1>
            <Image
              className="paypalQRCode"
              src={paypalQRCode}
              alt="PayPal QR code for donations"
              width={300}
              height={300}
            />
          </div>
          <div>
            <h1>
              Or mail a check to: Garden District Neighborhood Association at
              P.O. Box 70876, Milwaukee WI 53207
            </h1>
          </div>
        </div>
        <Image
          alt="Volunteers hands graphic"
          className="volunteerImage"
          src="https://cdn.pixabay.com/photo/2017/02/10/12/03/volunteer-2055015_1280.png"
          width={800}
          height={600}
        />
        <div>
          <h1>Volunteer With Us</h1>
          <div className="volunteer-content">
            <p>
              The Garden District Neighborhood Association is always welcoming
              volunteers.
            </p>
            <p>
              The Garden District Neighborhood Association has a need for
              volunteers. This volunteer group’s purpose is to bring the
              community together in order to maintain and improve the area,
              promote and facilitate fun activities, and develop community
              connections and financial stability. The opportunities available
              include garden maintenance, preparation, planting, the butterfly
              garden, grounds maintenance, History committee, and events.
            </p>
            <p>Please contact us below using any of the following methods:</p>
            <ul>
              <li>Let a Garden District Volunteer know you are interested.</li>
              <li>Call or text 414-379-2450.</li>
              <li>
                Email us at:
                <a href="mailto:info@milwaukeegdna.com">
                  info@milwaukeegdna.com
                </a>
              </li>
              <li>
                Contact us via Messenger or on Facebook at “Milwaukee’s Garden
                District.”
              </li>
            </ul>
            <p>
              Garden District Neighborhood Association is a volunteer-powered
              501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
