import React from 'react'

import './variables.css'
import './global.css'
import Navigation from './navigation-next'
import Footer from './footer-next'

const Layout = ({ children, logoUrl }) => {
  return (
    <>
      <Navigation logoUrl={logoUrl} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout