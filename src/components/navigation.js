import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
      <span className={styles.navigationItem}>Milwaukee GDNA</span>
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
        <Link to="/test" activeClassName="active">
          Test
        </Link>
      </li>
      <li>
        <Link to="/calendar/">Calendar</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/test/" activeClassName="active">
          testingCalendar
        </Link>
      </li>
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

export default Navigation
