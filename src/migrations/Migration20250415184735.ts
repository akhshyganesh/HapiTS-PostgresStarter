import { Migration } from '@mikro-orm/migrations';

export class Migration20250415184735 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "role" text check ("role" in (\'user\', \'admin\')) not null default \'user\', "is_active" boolean not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql('create index "users_email_index" on "users" ("email");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }
}
