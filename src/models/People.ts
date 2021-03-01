import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Room from './Room';
import Space from './Space';

@Entity('peoples')
class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  roomId: string;

  @Column()
  spaceId: string;

  @OneToOne(() => Room, (room: Room) => room.people)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @OneToOne(() => Space, (space: Space) => space.people)
  @JoinColumn({ name: 'spaceId' })
  space: Space;
}

export default People;
