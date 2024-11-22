/*
  Warnings:

  - You are about to drop the column `nome` on the `guests` table. All the data in the column will be lost.
  - Added the required column `name` to the `guests` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "hasCompanions" BOOLEAN NOT NULL,
    "numberCompanions" INTEGER NOT NULL,
    "eventId" TEXT,
    CONSTRAINT "guests_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_guests" ("confirmed", "email", "eventId", "hasCompanions", "id", "numberCompanions") SELECT "confirmed", "email", "eventId", "hasCompanions", "id", "numberCompanions" FROM "guests";
DROP TABLE "guests";
ALTER TABLE "new_guests" RENAME TO "guests";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
