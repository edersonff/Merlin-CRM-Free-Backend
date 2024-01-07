import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Filter } from 'src/filter/entities/filter.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive' = 'active';

  @Column({
    type: 'enum',
    enum: ['developer', 'manager', 'proposal', 'closer', 'admin'],
    default: 'developer',
  })
  role: 'developer' | 'manager' | 'proposal' | 'closer' | 'admin';

  @OneToMany(() => Filter, (filter) => filter.user)
  filters: Filter[];
}
