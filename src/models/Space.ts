import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import People from './People';

@Entity('spaces')
class Space {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  total: number;

  @OneToMany(() => People, people => people.space)
  people: People;
}

export default Space;
