import postgres from "postgres"

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  NODE_ENV,
} = process.env

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
  throw new Error("Missing required PostgreSQL environment variables.")
}

// Fallbacks
const host = POSTGRES_HOST || (NODE_ENV === "production" ? "db" : "localhost")
const port = 5432

// Final URL
const POSTGRES_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${host}:${port}/${POSTGRES_DB}`

// Export the connection
export const sql = postgres(POSTGRES_URL)
