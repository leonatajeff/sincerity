// page.tsx in src/app/
'use client'

import { signIn } from 'next-auth/react'

export default function HomePage() {
  return (
    <div>
      <button data-testid="sign-in-button" onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  )
}