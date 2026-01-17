// server/api/__sitemap__/urls.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // 1. Fetch your dynamic data (e.g., blog posts)
  const { data: posts } = await client
    .from('posts')
    .select('slug, updated_at') // Fetch only what you need
  
  if (!posts) return []

  // 2. Map them to the sitemap format
  return posts.map((p) => {
    return {
      loc: `/blog/${p.slug}`,      // The URL path
      lastmod: p.updated_at,       // (Optional) Date for SEO freshness
      changefreq: 'weekly',        // (Optional) Hint to crawlers
      priority: 0.8                // (Optional) Priority relative to other pages
    }
  })
})