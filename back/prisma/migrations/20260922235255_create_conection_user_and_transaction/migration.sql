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
    "userId" TEXT,
    CONSTRAINT "Transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("amount", "categoryId", "createdAt", "description", "id", "isDeleted", "type", "updatedAt") SELECT "amount", "categoryId", "createdAt", "description", "id", "isDeleted", "type", "updatedAt" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
