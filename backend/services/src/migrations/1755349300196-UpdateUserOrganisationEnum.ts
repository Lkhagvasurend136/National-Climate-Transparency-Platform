import { MigrationInterface, QueryRunner } from "typeorm";
import { Organisation } from "../enums/organisation.enum"; // adjust path if needed

export class UpdateUserOrganisationEnum1755349300196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newValues = Object.values(Organisation);

    // Safety: clean unknowns
    await queryRunner.query(`
      UPDATE "public"."user"
      SET "organisation" = NULL
      WHERE "organisation"::text NOT IN (${newValues.map(v => `'${v}'`).join(", ")});
    `);

    // Rename old enum
    await queryRunner.query(`ALTER TYPE "user_organisation_enum" RENAME TO "user_organisation_enum_old";`);

    // Create new enum
    await queryRunner.query(`
      CREATE TYPE "user_organisation_enum" AS ENUM (${newValues.map(v => `'${v}'`).join(", ")});
    `);

    // Migrate column
    await queryRunner.query(`
      ALTER TABLE "public"."user"
      ALTER COLUMN "organisation"
      TYPE "user_organisation_enum"
      USING "organisation"::text::"user_organisation_enum";
    `);

    // Drop old enum
    await queryRunner.query(`DROP TYPE "user_organisation_enum_old";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Example rollback: if you want to restore old ones explicitly
    const oldValues = [
      "Ministry of Foreign Affairs and Tourism",
      "Ministry of Fisheries"
    ];

    await queryRunner.query(`
      UPDATE "public"."user"
      SET "organisation" = NULL
      WHERE "organisation"::text NOT IN (${oldValues.map(v => `'${v}'`).join(", ")});
    `);

    await queryRunner.query(`ALTER TYPE "user_organisation_enum" RENAME TO "user_organisation_enum_new";`);

    await queryRunner.query(`
      CREATE TYPE "user_organisation_enum" AS ENUM (${oldValues.map(v => `'${v}'`).join(", ")});
    `);

    await queryRunner.query(`
      ALTER TABLE "public"."user"
      ALTER COLUMN "organisation"
      TYPE "user_organisation_enum"
      USING "organisation"::text::"user_organisation_enum";
    `);

    await queryRunner.query(`DROP TYPE "user_organisation_enum_new";`);
  }
}












