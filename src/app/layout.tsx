import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { RegionProvider } from '@/lib/region'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Triad 2 — Clinical Decision Support',
  description: 'Clinical decision support for hypertension, diabetes and shock. Built for every clinician, everywhere.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2064%2064%22%3E%3Cdefs%3E%3CradialGradient%20id=%22bg%22%20cx=%2250%25%22%20cy=%2250%25%22%20r=%2250%25%22%3E%3Cstop%20offset=%220%25%22%20stop-color=%22%231e293b%22/%3E%3Cstop%20offset=%22100%25%22%20stop-color=%22%230f172a%22/%3E%3C/radialGradient%3E%3Cfilter%20id=%22glow%22%20x=%22-30%25%22%20y=%22-30%25%22%20width=%22160%25%22%20height=%22160%25%22%3E%3CfeGaussianBlur%20stdDeviation=%221%22%20result=%22blur%22/%3E%3CfeMerge%3E%3CfeMergeNode%20in=%22blur%22/%3E%3CfeMergeNode%20in=%22SourceGraphic%22/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Ccircle%20cx=%2232%22%20cy=%2232%22%20r=%2232%22%20fill=%22url(%23bg)%22/%3E%3Cline%20x1=%2232%22%20y1=%228%22%20x2=%2254%22%20y2=%2244%22%20stroke=%22%230ea5e9%22%20stroke-width=%222.2%22%20stroke-linecap=%22round%22/%3E%3Cline%20x1=%2254%22%20y1=%2244%22%20x2=%2210%22%20y2=%2244%22%20stroke=%22%23a855f7%22%20stroke-width=%222.2%22%20stroke-linecap=%22round%22/%3E%3Cline%20x1=%2210%22%20y1=%2244%22%20x2=%2232%22%20y2=%228%22%20stroke=%22%23ef4444%22%20stroke-width=%222.2%22%20stroke-linecap=%22round%22/%3E%3Cpolyline%20points=%2215,29%2019,29%2022,19%2025,37%2028,23%2031,29%2035,29%2038,15%2041,36%2044,29%2048,29%22%20fill=%22none%22%20stroke=%22%23f0f9ff%22%20stroke-width=%221.8%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20opacity=%220.9%22%20filter=%22url(%23glow)%22/%3E%3Ccircle%20cx=%2232%22%20cy=%2229%22%20r=%222.2%22%20fill=%22white%22%20opacity=%220.9%22/%3E%3C/svg%3E",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RegionProvider>
            {children}
          </RegionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
