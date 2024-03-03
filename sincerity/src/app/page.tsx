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
    <div className="container mx-auto flex items-center h-screen flex-col justify-center px-5">
      <h1 className="text-5xl font-bold mb-4">Crafting Cover Letters with Sincerity</h1>
      <p className="text-lg text-gray-700 mb-8">
        Say goodbye to the wasted hours on ignored applications, craft compelling, personalized cover letters in seconds.
      </p>
      
      <button 
        onClick={loginWithGoogle}
        className="w-full sm:w-auto flex justify-center py-3 px-5 mb-4 sm:mb-0 font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Continue with Google
      </button>
    </div>
  )
}