// Utility functions for PDF generation from calendar data
// This can be used if you want to generate PDFs dynamically from Contentful events

export function generateCalendarPrintStyles() {
  return `
    @media print {
      body * {
        visibility: hidden;
      }
      
      .printable-calendar,
      .printable-calendar * {
        visibility: visible;
      }
      
      .printable-calendar {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      
      .calendar-header {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #333;
        padding-bottom: 10px;
      }
      
      .calendar-month {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      
      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        border: 1px solid #333;
      }
      
      .calendar-day {
        border: 1px solid #ccc;
        padding: 8px;
        min-height: 80px;
        background: white;
      }
      
      .calendar-day-header {
        background: #f0f0f0;
        font-weight: bold;
        text-align: center;
        padding: 10px;
      }
      
      .calendar-event {
        background: #e6f3ff;
        padding: 2px 4px;
        margin: 2px 0;
        font-size: 10px;
        border-radius: 2px;
      }
      
      .no-print {
        display: none !important;
      }
    }
  `
}

// Function to trigger browser print dialog with calendar-optimized styles
export function printCalendar() {
  // Inject print styles
  const printStyles = generateCalendarPrintStyles()
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.innerText = printStyles
  document.head.appendChild(styleSheet)

  // Trigger print
  window.print()

  // Clean up styles after printing
  setTimeout(() => {
    document.head.removeChild(styleSheet)
  }, 1000)
}

// Function to create a printable calendar layout from event data
export function createPrintableCalendar(events, month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  return {
    month: monthNames[month],
    year,
    days: Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getDate() === day &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        )
      })

      return {
        day,
        events: dayEvents,
      }
    }),
    dayNames,
    firstDay,
  }
}
