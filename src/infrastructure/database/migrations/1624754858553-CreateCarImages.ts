import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarImages1624754858553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'cars_image',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true },
        { name: 'car_id', type: 'uuid' },
        {
          name: 'image_name',
          type: 'varchar',
        },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
      ],
      foreignKeys: [
        {
          name: 'FKCarImage',
          referencedTableName: 'cars',
          referencedColumnNames: ['id'],
          columnNames: ['car_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL',
        },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_image');
  }
}
