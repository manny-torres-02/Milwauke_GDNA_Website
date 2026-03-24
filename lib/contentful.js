// Contentful GraphQL client (no external deps)
const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master'
const CF_GQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`

async function cfRequest(query, variables = {}) {
  if (!SPACE || !TOKEN) {
    console.error(
      'Missing Contentful env vars: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN'
    )
    return null
  }
  try {
    const res = await fetch(CF_GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
      // Ensure Next can cache appropriately in SSG/SSR
      // Next 15: use default caching for build-time fetches
    })
    const json = await res.json()
    if (!res.ok || json.errors) {
      console.error('Contentful GraphQL error:', json.errors || res.statusText)
      return null
    }
    return json.data
  } catch (error) {
    console.error('Contentful GraphQL fetch failed:', error)
    return null
  }
}

// Simple paginator for Contentful GraphQL collections using limit/skip
async function paginateCollection({
  query,
  root,
  limit = 20,
  maxPages = 50,
  variables = {},
}) {
  const all = []
  let skip = 0
  for (let page = 0; page < maxPages; page++) {
    const data = await cfRequest(query, { ...variables, limit, skip })
    if (!data) break
    const collection = data?.[root]
    const items = collection?.items || []
    all.push(...items)
    if (items.length < limit) break
    skip += limit
  }
  return all
}

// Mappers to preserve .fields.* shape expected by components
function mapAsset(asset) {
  if (!asset) return null
  return {
    fields: {
      title: asset.title || null,
      description: asset.description || null,
      file: {
        // GraphQL `asset.url` is full (https://...). Components expect scheme-less URLs
        // and prepend `https:` themselves. Strip protocol to keep compatibility.
        url: asset.url ? asset.url.replace(/^https:/, '') : null,
      },
    },
  }
}

function mapPerson(person) {
  if (!person) return null
  return {
    sys: { id: person.sys?.id },
    fields: {
      name: person.name,
      shortBio: person.shortBio?.json || null,
      image: mapAsset(person.image),
    },
  }
}

function mapBlogPost(item) {
  if (!item) return null
  return {
    sys: { id: item.sys?.id },
    fields: {
      title: item.title,
      slug: item.slug,
      publishDate: item.publishDate,
      tags: item.tags || [],
      description: item.description?.json || null,
      body: item.body?.json || null,
      bodyLinks: item.body?.links || null,
      heroImage: mapAsset(item.heroImage),
      author: item.author ? mapPerson(item.author) : null,
    },
  }
}

function mapBoardMember(item) {
  if (!item) return null
  return {
    sys: { id: item.sys?.id },
    fields: {
      name: item.name,
      biography: item.biography || '',
      bioPhotos: mapAsset(item.bioPhotos),
    },
  }
}

function mapDownloadableFile(entry) {
  if (!entry) return null
  return {
    sys: { id: entry.sys?.id },
    fields: {
      fileDescription: entry.fileDescription || null,
      downloadableFile: mapAsset(entry.downloadableFile),
    },
  }
}

export async function getAllBlogPosts() {
  const query = /* GraphQL */ `
    query GetAllBlogPosts($limit: Int!, $skip: Int!) {
      blogPostCollection(limit: $limit, skip: $skip, order: publishDate_DESC) {
        items {
          sys {
            id
          }
          title
          slug
          publishDate
          tags
          description {
            json
          }
          body {
            json
          }
          heroImage {
            url
            title
            description
            width
            height
          }
          author {
            sys {
              id
            }
            name
            shortBio {
              json
            }
            image {
              url
              title
              description
              width
              height
            }
          }
        }
      }
    }
  `
  const items = await paginateCollection({
    query,
    root: 'blogPostCollection',
    limit: 20,
  })
  return items.map(mapBlogPost)
}

export async function getBlogPost(slug) {
  const query = /* GraphQL */ `
    query GetBlogPost($slug: String!, $limit: Int = 1) {
      blogPostCollection(where: { slug: $slug }, limit: $limit) {
        items {
          sys {
            id
          }
          title
          slug
          publishDate
          tags
          description {
            json
          }
          body {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  description
                  width
                  height
                }
              }
            }
          }
          heroImage {
            url
            title
            description
            width
            height
          }
          author {
            sys {
              id
            }
            name
            shortBio {
              json
            }
            image {
              url
              title
              description
              width
              height
            }
          }
        }
      }
    }
  `
  const data = await cfRequest(query, { slug })
  const item = data?.blogPostCollection?.items?.[0]
  return item ? mapBlogPost(item) : null
}

export async function getAllBlogSlugs() {
  const query = /* GraphQL */ `
    query GetAllBlogSlugs($limit: Int!, $skip: Int!) {
      blogPostCollection(limit: $limit, skip: $skip) {
        items {
          slug
        }
      }
    }
  `
  const items = await paginateCollection({
    query,
    root: 'blogPostCollection',
    limit: 200,
  })
  return items.map((i) => i.slug).filter(Boolean)
}

export async function getAllPeople() {
  const query = /* GraphQL */ `
    query GetAllPeople($limit: Int = 100) {
      personCollection(limit: $limit) {
        items {
          sys {
            id
          }
          name
          shortBio {
            json
          }
          image {
            url
            title
            description
            width
            height
          }
        }
      }
    }
  `
  const data = await cfRequest(query)
  if (!data) return []
  const items = data.personCollection?.items || []
  return items.map(mapPerson)
}

export async function getPerson(id) {
  const query = /* GraphQL */ `
    query GetPerson($id: String!) {
      person(id: $id) {
        sys {
          id
        }
        name
        shortBio {
          json
        }
        image {
          url
          title
          description
          width
          height
        }
      }
    }
  `
  const data = await cfRequest(query, { id })
  return data?.person ? mapPerson(data.person) : null
}

export async function getAllBoardMembers() {
  const query = /* GraphQL */ `
    query GetAllBoardMembers($limit: Int = 100) {
      boardMember2Collection(limit: $limit) {
        items {
          sys {
            id
          }
          name
          biography
          bioPhotos {
            url
            title
            description
            width
            height
          }
        }
      }
    }
  `
  const data = await cfRequest(query)
  if (!data) return []
  const items = data.boardMember2Collection?.items || []
  return items.map(mapBoardMember)
}

export async function getAsset(id) {
  const query = /* GraphQL */ `
    query GetAsset($id: String!) {
      asset(id: $id) {
        url
        title
        description
        width
        height
      }
    }
  `
  const data = await cfRequest(query, { id })
  return data?.asset ? mapAsset(data.asset) : null
}

export async function getCalendar() {
  const query = /* GraphQL */ `
    query GetCalendar($limit: Int = 1) {
      calendarCollection(limit: $limit) {
        items {
          sys {
            id
          }
          calendarPdf {
            url
            title
            description
            width
            height
          }
        }
      }
    }
  `
  const data = await cfRequest(query)
  const item = data?.calendarCollection?.items?.[0]
  if (!item) return null
  return {
    sys: { id: item.sys?.id },
    fields: {
      calendarPdf: mapAsset(item.calendarPdf),
    },
  }
}

// Note: This entry is a content type with an asset field. To migrate fully
// to GraphQL we need the Content Type ID to query by type.
// Keeping REST-like behavior via GraphQL is not possible without the type.
// For now, attempt a best-effort by querying as a generic entry is not
// supported; consider updating this once the Content Type ID is provided.
export async function getDownloadableFile(id) {
  const query = /* GraphQL */ `
    query GetDownloadableFile($id: String!) {
      downloadableFile(id: $id) {
        sys {
          id
        }
        fileDescription
        downloadableFile {
          url
          title
          description
          width
          height
        }
      }
    }
  `
  const data = await cfRequest(query, { id })
  const entry = data?.downloadableFile
  if (!entry) return null
  return mapDownloadableFile(entry)
}

export async function getAllDownloadableFiles() {
  const query = /* GraphQL */ `
    query GetAllDownloadableFiles($limit: Int!, $skip: Int!) {
      downloadableFileCollection(limit: $limit, skip: $skip, order: sys_publishedAt_DESC) {
        items {
          sys {
            id
          }
          fileDescription
          downloadableFile {
            url
            title
            description
            width
            height
          }
        }
      }
    }
  `
  const items = await paginateCollection({
    query,
    root: 'downloadableFileCollection',
    limit: 50,
  })
  return items.map(mapDownloadableFile)
}
