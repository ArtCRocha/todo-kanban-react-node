import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688228852202 implements MigrationInterface {
    name = 'Default1688228852202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "order" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "order" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "order"`);
    }

}
