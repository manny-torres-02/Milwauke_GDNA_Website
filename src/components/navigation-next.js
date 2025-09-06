'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import * as styles from './navigation.module.css'

const Navigation = ({ logoUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <>
      {isMenuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <nav role="navigation" className={styles.container} aria-label="Main">
        <Link href="/" className={styles.logoLink}>
          {logoUrl && (
            <img className={styles.logo} src={logoUrl} alt="Milwaukee GDNA Logo" />
          )}
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
            <Link 
              href="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link 
              href="/blog" 
              className={isActive('/blog') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link 
              href="/board" 
              className={isActive('/board') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              The Board
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link 
              href="/calendar" 
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link 
              href="/volunteer" 
              className={isActive('/volunteer') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Donate and Volunteer
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link 
              href="/resources" 
              className={isActive('/resources') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Links
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation