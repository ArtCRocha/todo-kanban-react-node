import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1691691766117 implements MigrationInterface {
    name = 'Default1691691766117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" character varying NOT NULL`);
    }

}
