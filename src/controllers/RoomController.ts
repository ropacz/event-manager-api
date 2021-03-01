import { getRepository, Repository } from 'typeorm';
import People from '../models/People';
import Room from '../models/Room';

import { RoomInteface } from '../interfaces/RoomInteface';
import { PeopleInteface } from '../interfaces/PeopleInteface';

import AppError from '../errors/AppError';

class RoomController {
  peopleRepository: Repository<People>;

  roomRepository: Repository<Room>;

  public async execute(): Promise<void> {
    this.peopleRepository = getRepository(People);
    this.roomRepository = getRepository(Room);
  }

  public async getAll({ query }: { query: string }): Promise<RoomInteface[]> {
    if (query) {
      const rooms = await this.roomRepository
        .createQueryBuilder('peoples')
        .where('LOWER(peoples.name) like LOWER(:name)', { name: `%${query}%` })
        .getMany();

      return rooms;
    }

    const rooms = await this.roomRepository.find({
      order: {
        total: 'ASC',
      },
    });
    return rooms;
  }

  public async getRoomById(
    id: string,
  ): Promise<{
    room: RoomInteface;
    people: Partial<PeopleInteface>[];
  }> {
    try {
      const room = await this.roomRepository.findOne({
        where: { id },
      });

      if (!room) {
        throw new AppError('Sala não existe');
      }

      const [people, count] = await this.peopleRepository.findAndCount({
        where: { roomId: room.id },
      });

      if (count !== room.total) {
        const newRoom = await this.roomRepository
          .createQueryBuilder('rooms')
          .update()
          .set({ total: count })
          .where('id = :id', { id })
          .returning('*')
          .execute();

        return { room: newRoom.raw[0], people };
      }

      return { room, people };
    } catch {
      throw new AppError('Erro na requisição');
    }
  }

  public async editPeopleInRoom(
    roomId: string,
    peopleIds: string[],
  ): Promise<{
    status: string;
  }> {
    try {
      await this.peopleRepository
        .createQueryBuilder('peoples')
        .update()
        .set({ roomId })
        .where('id = ANY (:peopleIds)', { peopleIds })
        .execute();

      if (roomId) {
        const countPeoples = await this.peopleRepository.count({ roomId });

        await this.roomRepository
          .createQueryBuilder('rooms')
          .update()
          .set({ total: countPeoples })
          .where('id = :roomId', { roomId })
          .execute();
      }

      return { status: 'success' };
    } catch (error) {
      throw new AppError('Erro na requisição');
    }
  }

  async createRoom(room: Partial<RoomInteface>): Promise<RoomInteface> {
    const response = this.roomRepository.create({
      name: room.name,
      capacity: room.capacity,
      total: 0,
    });

    await this.roomRepository.save(room);

    return response;
  }
}

export default RoomController;
