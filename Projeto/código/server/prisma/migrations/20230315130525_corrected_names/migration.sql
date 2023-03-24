/*
  Warnings:

  - You are about to drop the column `FastestLap` on the `Guess` table. All the data in the column will be lost.
  - You are about to drop the column `PolePosition` on the `Guess` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Winner" TEXT NOT NULL,
    "polePosition" TEXT,
    "fastestLap" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    CONSTRAINT "Guess_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("Winner", "createdAt", "id", "participantId", "raceId") SELECT "Winner", "createdAt", "id", "participantId", "raceId" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
