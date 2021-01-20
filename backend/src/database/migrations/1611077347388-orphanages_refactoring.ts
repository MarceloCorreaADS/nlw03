import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class orphanagesRefactoring1611077347388 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn("orphanages",new TableColumn({
        name: 'register_approved',
				type: 'boolean',
				default: false,
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("orphanages", "register_approved");
    }

}
