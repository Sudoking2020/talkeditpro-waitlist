import 'server-only'

import PocketBase from 'pocketbase'

const urlRaw = process.env.POCKETBASE_URL
const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL
const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD

let client: PocketBase | null = null
let authPromise: Promise<PocketBase> | null = null

function requireEnv(): { url: string; email: string; password: string } {
  if (!urlRaw || !adminEmail || !adminPassword) {
    throw new Error(
      'Missing PocketBase configuration: set POCKETBASE_URL, POCKETBASE_ADMIN_EMAIL, and POCKETBASE_ADMIN_PASSWORD.'
    )
  }
  const url = urlRaw.replace(/\/$/, '')
  return { url, email: adminEmail, password: adminPassword }
}

/**
 * Authenticated PocketBase client (superuser). Uses module-level caching;
 * re-authenticates when the auth token is missing or expired.
 */
export async function getPocketBaseAdmin(): Promise<PocketBase> {
  const { url, email, password } = requireEnv()

  if (client?.authStore.isValid) {
    return client
  }

  client = null

  if (authPromise) {
    return authPromise
  }

  authPromise = (async () => {
    const pb = new PocketBase(url)
    await pb.collection('_superusers').authWithPassword(email, password)
    client = pb
    return pb
  })()

  try {
    return await authPromise
  } finally {
    authPromise = null
  }
}
