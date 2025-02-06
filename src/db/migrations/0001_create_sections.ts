import { pgTable, serial, text, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const sectionsTable = pgTable('sections', {
  id: serial('id').primaryKey(),
  key: text('key'), // Теперь необязательное поле
  data: jsonb('data')
});

export async function up(db: any) {
  await db.schema.createTable(sectionsTable);
}

export async function down(db: any) {
  await db.schema.dropTable(sectionsTable);
} 