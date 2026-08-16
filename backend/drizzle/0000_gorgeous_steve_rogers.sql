CREATE TABLE `brews` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `coffee_name` text NOT NULL,
    `method` text NOT NULL,
    `roast_level` text NOT NULL,
    `grind_size` text NOT NULL,
    `brew_time` text NOT NULL,
    `rating` integer NOT NULL,
    `notes` text NOT NULL,
    `created_at` text DEFAULT (current_timestamp) NOT NULL
);