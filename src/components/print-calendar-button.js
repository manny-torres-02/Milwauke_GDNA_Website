'use client'

import { printCalendar } from '../utils/calendar-pdf'
import styles from './print-calendar-button.module.css'

export default function PrintCalendarButton({ className = '' }) {
  const handlePrint = () => {
    printCalendar()
  }

  return (
    <button
      onClick={handlePrint}
      className={`${styles.printButton} ${className}`}
      aria-label="Print calendar"
      title="Print this calendar"
    >
      🖨️ Print Calendar
    </button>
  )
}
