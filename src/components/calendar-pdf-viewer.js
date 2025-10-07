'use client'

import { useState } from 'react'
import styles from './calendar-pdf-viewer.module.css'

export default function CalendarPdfViewer({ pdfUrl, title }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = title || 'calendar.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    // Open PDF in new window for printing
    const printWindow = window.open(pdfUrl, '_blank')
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button
          onClick={handleDownload}
          className={styles.button}
          aria-label="Download PDF"
        >
          📥 Download PDF
        </button>

        <button
          onClick={handlePrint}
          className={styles.button}
          aria-label="Print PDF"
        >
          🖨️ Print
        </button>

        <button
          onClick={handleFullscreen}
          className={styles.button}
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? '📉 Exit Fullscreen' : '📈 Fullscreen'}
        </button>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          aria-label="Open in new tab"
        >
          🔗 Open in New Tab
        </a>
      </div>

      <div
        className={`${styles.pdfContainer} ${
          isFullscreen ? styles.fullscreen : ''
        }`}
      >
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          title={title || 'Calendar PDF'}
          className={styles.pdfFrame}
          loading="lazy"
        />
      </div>

      {isFullscreen && (
        <button
          onClick={handleFullscreen}
          className={styles.closeFullscreen}
          aria-label="Close fullscreen"
        >
          ✕
        </button>
      )}
    </div>
  )
}
