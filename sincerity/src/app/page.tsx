// page.tsx in src/app/
'use client'
import useSupabaseClient from 'lib/supabase/client';

export default function HomePage() {
  const supabase = useSupabaseClient();

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <a
        className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
        style={{ backgroundColor: '#3b5998' }}
        onClick={loginWithGoogle}
        role='button'
      >
        Continue with Google
      </a>
    </div>
  )
}