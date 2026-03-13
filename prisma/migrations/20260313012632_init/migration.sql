-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("created_at", "email", "first_name", "id", "last_name", "password_hash", "phone") SELECT "created_at", "email", "first_name", "id", "last_name", "password_hash", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserPreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "total_occupants" INTEGER,
    "max_rent" INTEGER,
    "location_tags" TEXT,
    "quiet_place" BOOLEAN,
    "has_dog" BOOLEAN,
    "close_to_supermarket" BOOLEAN,
    "close_to_bus_stop" BOOLEAN,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserPreference" ("close_to_bus_stop", "close_to_supermarket", "has_dog", "id", "location_tags", "max_rent", "quiet_place", "total_occupants", "updated_at", "user_id") SELECT "close_to_bus_stop", "close_to_supermarket", "has_dog", "id", "location_tags", "max_rent", "quiet_place", "total_occupants", "updated_at", "user_id" FROM "UserPreference";
DROP TABLE "UserPreference";
ALTER TABLE "new_UserPreference" RENAME TO "UserPreference";
CREATE UNIQUE INDEX "UserPreference_user_id_key" ON "UserPreference"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
