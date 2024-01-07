import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilterType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;
}
