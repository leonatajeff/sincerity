'use client'
// page.tsx
import Link from 'next/link';
import Form from 'components/form';

export default function CoverLetter() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <Form />
            <Link href="/pages/dashboard/history">
                view history
            </Link>
        </div>
    );
}