import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687719431852 implements MigrationInterface {
    name = 'Default1687719431852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "status" integer NOT NULL, "column" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "columns" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_f06bd55c083bf5ffa625716ba2b" FOREIGN KEY ("column") REFERENCES "columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_f06bd55c083bf5ffa625716ba2b"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
