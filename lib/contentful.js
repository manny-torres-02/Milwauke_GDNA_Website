import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
})

export async function getAllBlogPosts() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishDate',
    })
    return entries.items
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug) {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2, // Include referenced assets
    })
    return entries.items[0] || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getAllBlogSlugs() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      select: 'fields.slug',
    })
    return entries.items.map(item => item.fields.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching blog slugs:', error)
    return []
  }
}

export async function getAllPeople() {
  try {
    const entries = await client.getEntries({
      content_type: 'person',
    })
    return entries.items
  } catch (error) {
    console.error('Error fetching people:', error)
    return []
  }
}

export async function getPerson(id) {
  try {
    const entry = await client.getEntry(id)
    return entry
  } catch (error) {
    console.error('Error fetching person:', error)
    return null
  }
}

export async function getAllBoardMembers() {
  try {
    const entries = await client.getEntries({
      content_type: 'boardMember2',
    })
    return entries.items
  } catch (error) {
    console.error('Error fetching board members:', error)
    return []
  }
}

export async function getAsset(id) {
  try {
    const asset = await client.getAsset(id)
    return asset
  } catch (error) {
    console.error('Error fetching asset:', error)
    return null
  }
}

export async function getCalendar() {
  try {
    const entries = await client.getEntries({
      content_type: 'calendar',
      limit: 1,
    })
    return entries.items[0] || null
  } catch (error) {
    console.error('Error fetching calendar:', error)
    return null
  }
}

export async function getDownloadableFile(id) {
  try {
    const entry = await client.getEntry(id)
    return entry
  } catch (error) {
    console.error('Error fetching downloadable file:', error)
    return null
  }
}