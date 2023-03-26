-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "estado_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Cidade_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cidade" ("created_at", "estado_id", "id", "nome", "updated_at") SELECT "created_at", "estado_id", "id", "nome", "updated_at" FROM "Cidade";
DROP TABLE "Cidade";
ALTER TABLE "new_Cidade" RENAME TO "Cidade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
