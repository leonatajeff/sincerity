import Link from 'next/link';
import getUserSession from 'lib/getUserSession';
import createSupabaseServerClient from 'lib/supabase/server';

const Login = async () => {
    const { data } = await getUserSession();

    const logoutAction = async () => {
        'use server';
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
    };
    {
        !data.session && (
            <>
                <li>
                    <Link href='/register' className='text-ct-dark-600'>
                        Register
                    </Link>
                </li>
                <li>
                    <Link href='/login' className='text-ct-dark-600'>
                        Login
                    </Link>
                </li>
            </>
        )
    }
    {
        data.session && (
            <form action={logoutAction} className='flex'>
                <li>
                    <Link href='/profile' className='text-ct-dark-600'>
                        Profile
                    </Link>
                </li>
                <li>
                    <button className='ml-4'>Logout</button>
                </li>
            </form>
        )
    }
}