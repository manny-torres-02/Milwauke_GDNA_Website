import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'
import facebookIcon from './facebook.svg'
import instagramIcon from '../assets/Instagram_Glyph_Gradient.svg'
import paypalQRCode from '../assets/mgdna_paypal_QR_Code.png'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      <section className={styles.socialSection}>
        <h3 className={styles.sectionTitle}>Follow Us</h3>
        <div className={styles.socialIcons}>
          <a 
            href="https://www.facebook.com/MilwaukeeGardenDistrict/" 
            aria-label="Visit our Facebook page"
            className={styles.socialLink}
          >
            <img className={styles.socialIcon} src={facebookIcon} alt="Facebook" />
          </a>
          <a 
            href="https://www.instagram.com/mkegdna/"
            aria-label="Visit our Instagram page"
            className={styles.socialLink}
          >
            <img className={styles.socialIcon} src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </section>
      
      <section className={styles.donateSection}>
        <h3 className={styles.sectionTitle}>Donate to MGDNA</h3>
        <img className={styles.qrCode} src={paypalQRCode} alt="PayPal QR code for donations" />
      </section>
      
      <section className={styles.contactSection}>
        <h3 className={styles.sectionTitle}>Contact</h3>
        <address className={styles.address}>
          P.O. Box 70876<br />
          Milwaukee, WI 53207
        </address>
      </section>
    </div>
  </Container>
)

export default Footer
