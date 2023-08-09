import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1691504737121 implements MigrationInterface {
    name = 'Default1691504737121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a672f5f6d03ed69a71f5ae8e80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16721c181b128ccc8a1625cfa9"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" ADD "order" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "order" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_16721c181b128ccc8a1625cfa9" ON "columns" ("order") `);
        await queryRunner.query(`CREATE INDEX "IDX_a672f5f6d03ed69a71f5ae8e80" ON "tasks" ("order") `);
    }

}
