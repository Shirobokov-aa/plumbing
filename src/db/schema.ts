import { pgTable, text, jsonb, serial } from 'drizzle-orm/pg-core';
import type { SectionsData, CollectionItem, CollectionDetail } from '@/app/types/collections'
import type { BathroomPage, KitchenPage, AboutPage } from "@/app/types/pages"

export const collectionsTable = pgTable("collections", {
  id: serial("id").primaryKey(),
  data: jsonb("data").$type<CollectionItem[]>(),
})

export const sectionsTable = pgTable("sections", {
  id: serial("id").primaryKey(),
  key: text('key'),
  data: jsonb("data").$type<SectionsData>(),
})

export const collectionDetailsTable = pgTable('collection_details', {
  id: serial('id').primaryKey(),
  data: jsonb('data').$type<CollectionDetail[]>(),
})

export const bathroomPageTable = pgTable('bathroom_page', {
  id: serial('id').primaryKey(),
  data: jsonb('data').$type<BathroomPage>(),
})

export const kitchenPageTable = pgTable('kitchen_page', {
  id: serial('id').primaryKey(),
  data: jsonb('data').$type<KitchenPage>(),
})

export const aboutPageTable = pgTable('about_page', {
  id: serial('id').primaryKey(),
  data: jsonb('data').$type<AboutPage>(),
})

// export const sectionsTable = pgTable('sections', {
//   id: integer('id').primaryKey().notNull(),
//   key: text('key').notNull(),
//   data: jsonb('data').notNull()
// });

// export const collectionsTable = pgTable("collections", {
//   id: integer("id").primaryKey().notNull(),
//   data: jsonb("data").notNull(),
// })


// export const collectionDetailsTable = pgTable("collection_details", {
//   id: integer("id").primaryKey().notNull(),
//   data: jsonb("data").notNull(),
// })



// export const kitchenPageTable = pgTable('kitchen_page', {
//   id: integer('id').primaryKey().notNull(),
//   data: jsonb('data').notNull()
// });

// export const aboutPageTable = pgTable('about_page', {
//   id: integer('id').primaryKey().notNull(),
//   data: jsonb('data').notNull()
// });

// export const usersTable = pgTable('users', {
//   id: integer('id').primaryKey().notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   password: varchar('password', { length: 255 }).notNull(),
//   role: varchar('role', { length: 50 }).notNull().default('user')
// });
