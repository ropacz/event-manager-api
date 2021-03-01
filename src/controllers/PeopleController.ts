import { getRepository, Repository } from 'typeorm';
import People from '../models/People';
import Room from '../models/Room';
import Space from '../models/Space';

import { PeopleInteface } from '../interfaces/PeopleInteface';
import { RoomInteface } from '../interfaces/RoomInteface';
import { SpaceInteface } from '../interfaces/SpaceInteface';
import AppError from '../errors/AppError';

interface PeopleFullInteface {
  people: Partial<PeopleInteface>;
  room: RoomInteface;
  space: SpaceInteface;
}

class PeopleController {
  peopleRepository: Repository<People>;

  roomRepository: Repository<Room>;

  spaceRepository: Repository<Space>;

  public async execute(): Promise<void> {
    this.peopleRepository = getRepository(People);
    this.roomRepository = getRepository(Room);
    this.spaceRepository = getRepository(Space);
  }

  public async getAll({ query }: { query: string }): Promise<PeopleInteface[]> {
    try {
      if (query) {
        const peoples = await this.peopleRepository
          .createQueryBuilder('peoples')
          .leftJoinAndSelect('peoples.room', 'rooms')
          .leftJoinAndSelect('peoples.space', 'spaces')
          .where('LOWER(peoples.name) like LOWER(:name)', {
            name: `%${query}%`,
          })
          .getMany();

        return peoples;
      }

      const peoples = await this.peopleRepository
        .createQueryBuilder('peoples')
        .leftJoinAndSelect('peoples.room', 'rooms')
        .leftJoinAndSelect('peoples.space', 'spaces')
        .getMany();

      return peoples;
    } catch (error) {
      throw new AppError('Erro na requisição');
    }
  }

  public async getPeopleById(id: string): Promise<PeopleInteface[]> {
    try {
      const response = await this.peopleRepository
        .createQueryBuilder('peoples')
        .leftJoinAndSelect('peoples.room', 'rooms')
        .leftJoinAndSelect('peoples.space', 'spaces')
        .where('peoples.id = :id', { id })
        .getMany();

      return response;
    } catch {
      throw new AppError('Erro na requisição');
    }
  }

  public async getPeopleByRoomId(id: string): Promise<PeopleInteface[]> {
    try {
      const response = await this.peopleRepository
        .createQueryBuilder('peoples')
        .leftJoinAndSelect('peoples.room', 'rooms')
        .leftJoinAndSelect('peoples.space', 'spaces')
        .where('peoples.roomId = :id', { id })
        .getMany();

      return response;
    } catch {
      throw new AppError('Erro na requisição');
    }
  }

  public async createPeople({
    name,
    lastname,
  }: Partial<PeopleInteface>): Promise<PeopleInteface> {
    try {
      const people = this.peopleRepository.create({ name, lastname });
      await this.peopleRepository.save(people);

      return people;
    } catch (error) {
      throw new AppError('Erro na requisição');
    }
  }
}

export default PeopleController;
