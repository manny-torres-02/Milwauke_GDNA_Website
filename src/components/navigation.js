import React from 'react'
import { Link, graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby'

import * as styles from './navigation.module.css'

const Navigation = ({}) => {
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
    <nav role="navigation" className={styles.container} aria-label="Main">
      <Link to="/" className={styles.logoLink}>
        {/* <Link to="/" className="logoLink" > */}

        <img className={styles.logo} src={logo.contentfulAsset.file.url} />
        {/* <p>{logo.contentfulAsset.id}</p> */}
        {/* <span className={styles.navigationItem}>Milwaukee GDNA</span> */}
      </Link>
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/" activeClassName="active">
            Home
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog/" activeClassName="active">
            Blog
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/board/" activeClassName="active">
            The Board
          </Link>
        </li>
        <li>
          <Link to="/calendar/">Calendar</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/volunteer" activeClassName="active">
            Volunteer
          </Link>
        </li>
        <li className={styles.NavigationItem}>
          <Link to="/resources" activeClassName="active">
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
  )
}

export default Navigation
