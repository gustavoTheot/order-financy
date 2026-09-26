/*
  Warnings:

  - You are about to drop the column `Description` on the `Category` table. All the data in the column will be lost.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Category" ("color", "icon", "id", "isDeleted", "title") SELECT "color", "icon", "id", "isDeleted", "title" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
