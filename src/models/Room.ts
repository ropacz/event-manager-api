import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import People from './People';

@Entity('rooms')
class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  total: number;

  @OneToMany(() => People, people => people.room)
  people: People;
}

export default Room;
