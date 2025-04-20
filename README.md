# Postgres CSV Exporter

A simple Node.js script that exports data from a PostgreSQL database into a CSV file using streaming and cursors.

> ⚙️ Built with TypeScript, PostgreSQL, csv-stringify and node-postgres (via `postgres` package).
> ⚠️ **This project uses Node.js v23+ with TypeScript support enabled.**

## Features

- Uses **PostgreSQL cursors** to handle large datasets efficiently
- **Streams** data directly to CSV (no memory bottlenecks)
- `faker.js`-powered seeder to generate dummy products
- Docker-based local database setup (via `docker-compose`)
- Clean and minimal codebase for learning and experimentation

## Use Cases

- Benchmarking CSV exports in Node.js
- Testing large dataset handling
- Data transformation pipelines
- Portfolio / learning purposes

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/vWernay/node-pg-csv.git
cd node-pg-csv
```

### 2. Setup the database

Run PostgreSQL via Docker:

```bash
docker compose up -d
```

> Default credentials are defined in `.env` (user: `docker`, password: `docker`).

### 3. Install dependencies

```bash
pnpm i
```

### 4. Seed the database

Generates 200,000 fake product entries (20 x 10,000 batches):

```bash
pnpm run seed-db
```

### 5. Run the export

Exports all products with price >= 1000 into a CSV file:

```bash
pnpm run export-csv
```

Resulting file: `./export.csv`

---

## Requirements

- Node.js `v23` or newer
- `pnpm` or `npm`
- Docker (for PostgreSQL)

---

## Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm run seed-db`    | Seeds the DB with fake products  |
| `npm run export-csv` | Exports filtered products to CSV |

---

## License

[MIT](LICENSE.md) — do whatever you want. Just don't forget to learn something. 🚀
