-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "documento" TEXT NOT NULL,
    "cidade_id" TEXT NOT NULL,
    "tipo_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Pessoa_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Pessoa_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "TipoSanguineo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pessoa" ("cidade_id", "complemento", "created_at", "documento", "id", "nome", "numero", "rua", "tipo_id", "updated_at") SELECT "cidade_id", "complemento", "created_at", "documento", "id", "nome", "numero", "rua", "tipo_id", "updated_at" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_documento_key" ON "Pessoa"("documento");
CREATE TABLE "new_LocaisColeta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "cidade_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "LocaisColeta_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LocaisColeta" ("cidade_id", "complemento", "created_at", "id", "nome", "numero", "rua", "updated_at") SELECT "cidade_id", "complemento", "created_at", "id", "nome", "numero", "rua", "updated_at" FROM "LocaisColeta";
DROP TABLE "LocaisColeta";
ALTER TABLE "new_LocaisColeta" RENAME TO "LocaisColeta";
CREATE TABLE "new_Doacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pessoa_id" TEXT NOT NULL,
    "local_id" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Doacao_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Doacao_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "LocaisColeta" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Doacao" ("created_at", "data", "id", "local_id", "pessoa_id", "updated_at") SELECT "created_at", "data", "id", "local_id", "pessoa_id", "updated_at" FROM "Doacao";
DROP TABLE "Doacao";
ALTER TABLE "new_Doacao" RENAME TO "Doacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
