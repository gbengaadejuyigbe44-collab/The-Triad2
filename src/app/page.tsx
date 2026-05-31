// Root page — redirects to /reference (the new clinical reference app)
// The Tracker is at /dashboard (auth protected)
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/reference')
}
