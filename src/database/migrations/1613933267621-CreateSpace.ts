import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSpace1613933267621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'spaces',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(200)',
          },
          {
            name: 'capacity',
            type: 'integer',
          },
          {
            name: 'total',
            type: 'integer',
            default: 0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('spaces');
  }
}
