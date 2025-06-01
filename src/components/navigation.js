import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby'

import * as styles from './navigation.module.css'

const Navigation = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logo = useStaticQuery(graphql`
    query logo {
      contentfulAsset(contentful_id: { eq: "7czINe9HAu90wBzrc8Athc" }) {
        id
        file {
          fileName
          url
        }
      }
    }
  `)

  // const logo = useStaticQuery(graphql`
  // query logo {
  //   allContentfulAsset {
  //     group(field: contentful_id) {
  //       edges {
  //         node {
  //           id
  //         }
  //       }
  //     }
  //   }
  // }

  // `)

  console.log(logo)

  return (
    <>
      {isMenuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <nav role="navigation" className={styles.container} aria-label="Main">
      <Link to="/" className={styles.logoLink}>
        {/* <Link to="/" className="logoLink" > */}

        <img className={styles.logo} src={logo.contentfulAsset.file.url} />
        {/* <p>{logo.contentfulAsset.id}</p> */}
        {/* <span className={styles.navigationItem}>Milwaukee GDNA</span> */}
      </Link>
      <button 
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}>
        <li className={styles.navigationItem}>
          <Link to="/" activeClassName="active" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog/" activeClassName="active" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/board/" activeClassName="active" onClick={() => setIsMenuOpen(false)}>
            The Board
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/calendar/" onClick={() => setIsMenuOpen(false)}>Calendar</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/volunteer" activeClassName="active" onClick={() => setIsMenuOpen(false)}>
            Donate and Volunteer
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/resources" activeClassName="active" onClick={() => setIsMenuOpen(false)}>
            Links
          </Link>
        </li>
        {/* <li className={styles.navigationItem}>
        <Link to="/Resources" activeClassName="active">
          Resources
        </Link>
      </li> */}
        {/* <li className={styles.navigationItem}>
        <Link to='/calendar/' activeClassName='active'>
          calendar
        </Link>

      </li>
      <li className={styles.navigationItem}>
        <Link to='/about/' activeClassName='active'>
          about
        </Link>

      </li> */}
      </ul>
      </nav>
    </>
  )
}

export default Navigation
