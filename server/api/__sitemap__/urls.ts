import { serverSupabaseClient } from '#supabase/server'

// 1. Define the shape of your data
interface SitemapPost {
  slug: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // 2. Fetch data (Note: changed table name to 'blog_posts')
  const { data } = await client
    .from('blog_posts') 
    .select('slug, updated_at')

  // 3. Cast the data to your interface so TS knows 'slug' exists
  const posts = data as unknown as SitemapPost[]

  if (!posts) return []

  // 4. Map to sitemap format
  return posts.map((p) => {
    return {
      loc: `/resources/${p.slug}`,
      lastmod: p.updated_at,
      changefreq: 'weekly',
      priority: 0.8
    }
  })
})