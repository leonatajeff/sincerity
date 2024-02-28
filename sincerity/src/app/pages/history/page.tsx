import Link from 'next/link';

export default function History() {
    return (
        <div>
            <h1>History</h1>
            <Link href="/">
                back
            </Link>
        </div>
    );
}