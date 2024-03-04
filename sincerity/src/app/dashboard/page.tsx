import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/coverletter">
          <div className="py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer">Create a Cover Letter</div>
        </Link>
        <Link href="/dashboard/history">
          <div className="py-2 px-4 text-white text-center rounded-md hover:bg-gray-600 transition-colors duration-300 cursor-pointer">History</div>
        </Link>
      </div>
    </div>
  )
}
