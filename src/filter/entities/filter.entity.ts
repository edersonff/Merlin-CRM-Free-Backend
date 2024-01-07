import { FilterType } from 'src/filter-type/entities/filter-type.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 156, unique: true })
  url: string;

  @Column({ type: 'boolean' })
  is_valid: boolean;

  @ManyToMany(() => FilterType)
  @JoinTable()
  filter_type: FilterType[];

  @ManyToOne(() => User, (user) => user.filters)
  user: User;
}
