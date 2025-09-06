import Image from 'next/image'
import Layout from '../../src/components/layout-next'
import Container from '../../src/components/container'
import paypalQRCode from '../../src/assets/mgdna_paypal_QR_Code.png'
import '../../src/components/volunteer.css'

export const metadata = {
  title: 'Donate and Volunteer | Milwaukee Garden District Neighborhood Association',
  description: 'Support the Milwaukee Garden District Neighborhood Association through donations and volunteering.',
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
          alt="Hero Photo, Hands"
          className="volunteer"
          src="https://cdn.pixabay.com/photo/2017/02/10/12/03/volunteer-2055015_1280.png"
          width={800}
          height={600}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Container>
    </Layout>
  )
}