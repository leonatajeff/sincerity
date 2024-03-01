import Link from 'next/link';

export default function History() {
    return (
        <div>
            <h1>History</h1>
            <Link href="/pages/dashboard/coverletter">
                Create a new cover letter
            </Link>
            <Link href="/pages/dashboard">
                Back to dashboard
            </Link>
        </div>
    );
}