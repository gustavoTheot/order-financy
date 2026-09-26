/*
  Warnings:

  - You are about to drop the column `value` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("categoryId", "createdAt", "description", "id", "isDeleted", "type", "updatedAt") SELECT "categoryId", "createdAt", "description", "id", "isDeleted", "type", "updatedAt" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
