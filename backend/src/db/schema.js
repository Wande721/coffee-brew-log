const { sqliteTable, integer, text } = require('drizzle-orm/sqlite-core');
const { sql } = require('drizzle-orm');

// This defines the shape of the "brews" table. Drizzle reads this file to
// (a) generate SQL migrations and (b) give us type-safe query builders.
const brews = sqliteTable('brews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  coffeeName: text('coffee_name').notNull(),
  method: text('method').notNull(),        // e.g. "Pour Over", "Espresso"
  roastLevel: text('roast_level').notNull(), // "Light" | "Medium" | "Dark"
  grindSize: text('grind_size').notNull(),   // "Fine" | "Medium" | "Coarse"
  brewTime: text('brew_time').notNull(),     // free text, e.g. "3:30"
  rating: integer('rating').notNull(),       // 1-5
  notes: text('notes').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
});

module.exports = { brews };