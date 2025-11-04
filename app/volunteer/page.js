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
        <div style={{ marginTop: '24px' }}>
          <h1> Volunteer to set up Winter Wonderland</h1>
          <p>
            Our Winter Wonderland event is right around the corner, and we need
            your help to make it shine! ❄️✨
          </p>

          <p>
            Join our volunteer team to help with setup, decorations, and
            creating a cozy, festive atmosphere that everyone can enjoy. Whether
            you have an hour or a few, your support makes a huge difference!
          </p>
          <a
            href="https://www.signupgenius.com/go/20F054DABAF2BAAF49-59680253-winter#/"
            target="_blank"
            rel="noopener noreferrer"
            className="ctaButton"
            aria-label="Volunteer for Winter Wonderland set up"
          >
            Volunteer for Winter Wonderland set up
          </a>
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
