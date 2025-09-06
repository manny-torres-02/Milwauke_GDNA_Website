import '../src/components/variables.css'
import '../src/components/global.css'

export const metadata = {
  title: 'Milwaukee Garden District Neighborhood Association',
  description: 'Official Contentful Gatsby Starter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}