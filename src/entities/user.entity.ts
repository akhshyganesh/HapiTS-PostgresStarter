import { Entity, Property, PrimaryKey, BeforeCreate, Enum, Unique, Index } from '@mikro-orm/core';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  @Unique()
  @Index()
  email!: string;

  @Property({ hidden: true }) // This ensures the password isn't serialized
  password!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Enum(() => UserRole)
  role: UserRole = UserRole.USER;

  @Property()
  isActive: boolean = true;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @BeforeCreate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
