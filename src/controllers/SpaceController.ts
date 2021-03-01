import { getRepository, Repository, Like } from 'typeorm';
import People from '../models/People';
import Space from '../models/Space';

import { SpaceInteface } from '../interfaces/SpaceInteface';
import { PeopleInteface } from '../interfaces/PeopleInteface';

import AppError from '../errors/AppError';

class SpaceController {
  peopleRepository: Repository<People>;

  spaceRepository: Repository<Space>;

  public async execute(): Promise<void> {
    this.peopleRepository = getRepository(People);
    this.spaceRepository = getRepository(Space);
  }

  public async getAll({ query }: { query: string }): Promise<SpaceInteface[]> {
    try {
      if (query) {
        const spaces = await this.spaceRepository
          .createQueryBuilder('spaces')
          .where('LOWER(spaces.name) like LOWER(:name)', { name: `%${query}%` })
          .getMany();
        return spaces;
      }

      const spaces = await this.spaceRepository.find();
      return spaces;
    } catch (error) {
      throw new AppError('Erro na requisição');
    }
  }

  public async getSpaceById(
    id: string,
  ): Promise<{
    space: SpaceInteface;
    people: Partial<PeopleInteface>[];
  }> {
    try {
      const space = await this.spaceRepository.findOne({
        where: { id },
      });

      if (!space) {
        throw new AppError('Espaço não existe');
      }

      const [people, count] = await this.peopleRepository.findAndCount({
        where: { spaceId: space.id },
      });

      if (count !== space.total) {
        const newSpace = await this.spaceRepository
          .createQueryBuilder('spaces')
          .update()
          .set({ total: count })
          .where('id = :id', { id })
          .returning('*')
          .execute();

        return { space: newSpace.raw[0], people };
      }

      return { space, people };
    } catch {
      throw new AppError('Erro na requisição');
    }
  }

  public async editPeopleInSpace(
    spaceId: string,
    peopleIds: string[],
  ): Promise<{
    status: string;
  }> {
    try {
      await this.peopleRepository
        .createQueryBuilder('peoples')
        .update()
        .set({ spaceId })
        .where('id = ANY (:peopleIds)', { peopleIds })
        .execute();

      if (spaceId) {
        const countPeoples = await this.peopleRepository.count({ spaceId });

        await this.spaceRepository
          .createQueryBuilder('spaces')
          .update()
          .set({ total: countPeoples })
          .where('id = :spaceId', { spaceId })
          .execute();
      }

      return { status: 'success' };
    } catch (error) {
      throw new AppError('Espaço não existe');
    }
  }

  async createSpace(space: Partial<SpaceInteface>): Promise<SpaceInteface> {
    const response = this.spaceRepository.create({
      name: space.name,
      capacity: space.capacity,
      total: 0,
    });

    await this.spaceRepository.save(space);

    return response;
  }
}

export default SpaceController;
