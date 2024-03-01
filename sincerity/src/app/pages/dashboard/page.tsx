import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome</p>
        <Link href="/pages/dashboard/coverletter">
            cover letter
        </Link>
        <Link href="/pages/dashboard/history">
            history
        </Link>
    </div>
  )
}