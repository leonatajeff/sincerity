import { createClient } from '@supabase/supabase-js'
import { Database } from '@/app/interfaces/database.types'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return Response.json({ error: 'User ID is required' })
  }

  const { data, error } = await supabase
    .from('user')
    .select()
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user:', error.message)
    return null
  }

  return Response.json({ data })
}