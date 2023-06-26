/*
  Warnings:

  - Added the required column `test` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "test" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("categoryId", "content", "createdAt", "difficulty", "id", "image", "ingredients", "time", "title", "updatedAt", "video") SELECT "categoryId", "content", "createdAt", "difficulty", "id", "image", "ingredients", "time", "title", "updatedAt", "video" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
