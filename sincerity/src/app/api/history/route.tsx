import { createClient } from '@supabase/supabase-js'
import { Database } from '@/app/interfaces/database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 })
  }

  const { data, error } = await supabase
    .from('user')
    .select()
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user:', error.message)
    return new Response(JSON.stringify({ error: 'Error fetching user' }), { status: 500 })
  }

  return new Response(JSON.stringify({ data }), { status: 200 })
}
