import { stringify } from "csv-stringify"
import { createWriteStream } from "node:fs"
import { Transform } from "node:stream"
import { pipeline } from "node:stream/promises"
import { sql } from "./db/client.ts"

const outputFile = process.env.EXPORT_PATH || './export.csv'

const query = sql/*sql*/`
  SELECT id, name
  FROM products
  WHERE price_in_cents >= 1000
`

const cursor = query.cursor(10)

const exampleStream = new Transform({
  objectMode: true,
  transform(chunk: { id: number, name: string }[], _encoding, callback) {
    for (const item of chunk) {
      this.push(item)
    }
    callback()
  }
})

console.log("Starting CSV export...")
const start = Date.now()

await pipeline(
  cursor,
  exampleStream,
  stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
    ]
  }),
  createWriteStream(outputFile, 'utf-8')
)

const duration = ((Date.now() - start) / 1000).toFixed(2)
console.log(`✅ Export completed in ${duration}s → ./export.csv`)

await sql.end()
