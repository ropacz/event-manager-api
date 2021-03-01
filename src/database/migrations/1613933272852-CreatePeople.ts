import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePeople1613933272852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'peoples',
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
            name: 'lastname',
            type: 'varchar(200)',
          },
          {
            name: 'roomId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'spaceId',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'providerRoomPeople',
            referencedTableName: 'rooms',
            referencedColumnNames: ['id'],
            columnNames: ['roomId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'providerSpacePeople',
            referencedTableName: 'spaces',
            referencedColumnNames: ['id'],
            columnNames: ['spaceId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('peoples');
  }
}
