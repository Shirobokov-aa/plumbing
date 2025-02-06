import { sql } from "drizzle-orm"
import { pgTable, integer, jsonb } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export const collectionDetails = pgTable("collection_details", {
  id: integer("id").primaryKey().notNull(),
  data: jsonb("data").notNull(),
})

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 })

export async function up() {
  const db = drizzle(migrationClient)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS collection_details (
      id INTEGER PRIMARY KEY NOT NULL,
      data JSONB NOT NULL
    )
  `)
}

export async function down() {
  const db = drizzle(migrationClient)
  await db.execute(sql`DROP TABLE IF EXISTS collection_details`)
}

