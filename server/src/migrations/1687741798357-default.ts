import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687741798357 implements MigrationInterface {
    name = 'Default1687741798357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_f06bd55c083bf5ffa625716ba2b"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_f06bd55c083bf5ffa625716ba2b" FOREIGN KEY ("column") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_f06bd55c083bf5ffa625716ba2b"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_f06bd55c083bf5ffa625716ba2b" FOREIGN KEY ("column") REFERENCES "columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
