import { Migration } from '@mikro-orm/migrations';

export class Migration20240707153436 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "created_at" date not null, "updated_at" timestamptz not null);',
    );
  }
}
