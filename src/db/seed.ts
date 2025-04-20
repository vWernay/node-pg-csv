import { sql } from "./client.ts"
import { faker } from '@faker-js/faker'

await sql`
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_in_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`

await sql`TRUNCATE TABLE products`

const batchCount = 20
const batchSize = 10_000
for (let i = 0; i < batchCount; i++) {
  const products = Array.from({ length: batchSize }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price_in_cents: faker.number.int({ min: 100, max: 10_000 }),
  }))

  await sql`INSERT INTO products ${sql(products)}`
  console.log(`Inserted batch ${i + 1}/${batchCount}`)
}

console.log("✅ Done seeding.")
await sql.end()
