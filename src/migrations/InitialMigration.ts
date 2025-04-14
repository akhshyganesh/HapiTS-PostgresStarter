import { Migration } from '@mikro-orm/migrations';

export class InitialMigration extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(
      knex.schema
        .createTable('users', (table) => {
          table.uuid('id').primary();
          table.string('email').notNullable().unique();
          table.string('password').notNullable();
          table.string('first_name').notNullable();
          table.string('last_name').notNullable();
          table.enum('role', ['user', 'admin']).notNullable().defaultTo('user');
          table.boolean('is_active').notNullable().defaultTo(true);
          table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
          table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        })
        .toQuery(),
    );
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS users');
  }
}
