import { Migration as MikroOrmMigration } from '@mikro-orm/migrations';

export class Migration extends MikroOrmMigration {
  async up(): Promise<void> {
    // Implementation of the migration up
  }

  async down(): Promise<void> {
    // Implementation of the migration down
  }
}
