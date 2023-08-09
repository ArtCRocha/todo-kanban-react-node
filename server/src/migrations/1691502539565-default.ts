import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1691502539565 implements MigrationInterface {
    name = 'Default1691502539565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "order" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tasks_order_seq"`);
        await queryRunner.query(`ALTER TABLE "columns" ALTER COLUMN "order" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "columns_order_seq"`);
        await queryRunner.query(`CREATE INDEX "IDX_a672f5f6d03ed69a71f5ae8e80" ON "tasks" ("order") `);
        await queryRunner.query(`CREATE INDEX "IDX_16721c181b128ccc8a1625cfa9" ON "columns" ("order") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_16721c181b128ccc8a1625cfa9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a672f5f6d03ed69a71f5ae8e80"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "columns_order_seq" OWNED BY "columns"."order"`);
        await queryRunner.query(`ALTER TABLE "columns" ALTER COLUMN "order" SET DEFAULT nextval('"columns_order_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tasks_order_seq" OWNED BY "tasks"."order"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "order" SET DEFAULT nextval('"tasks_order_seq"')`);
    }

}
