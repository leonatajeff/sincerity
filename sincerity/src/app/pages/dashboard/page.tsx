import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { status, data: session } = useSession()
  const router = useRouter()

  if (status === "loading") return null // Loading state (optional)

  if (!session) {
    router.push('/')
    return null; // If no session exists, redirect to homepage
  }
  // Else, user is logged in and you can display the dashboard
  return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome {session?.user?.name}</p>
        <Link href="/pages/coverletter">
            cover letter
        </Link>
        <Link href="/pages/history">
            history
        </Link>
    </div>
  )
}