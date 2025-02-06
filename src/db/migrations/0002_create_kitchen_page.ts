import { pgTable, serial, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const kitchenPageTable = pgTable('kitchen_page', {
  id: serial('id').primaryKey(),
  data: jsonb('data').notNull()
});

export async function up(db: any) {
  await db.schema.createTable(kitchenPageTable);
}

export async function down(db: any) {
  await db.schema.dropTable(kitchenPageTable);
} 