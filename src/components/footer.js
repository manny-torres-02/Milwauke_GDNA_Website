import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'
import facebookIcon from './facebook.svg'

const Footer = () => (
  <Container as="footer">
    {/* TODO:  ADD Socials  */}
    <div className={styles.container}>
    <a href = "https://www.facebook.com/MilwaukeeGardenDistrict/ "><img className={styles.facebook_icon} src = {facebookIcon} /></a>
    
{/* <img src="TGD_LOGOS-01.png" alt="text"/> */}
    </div>
  </Container>
)

export default Footer
