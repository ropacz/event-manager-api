import { Router } from 'express';

import PeopleController from '../controllers/PeopleController';

const People = new PeopleController();
const peopleRouter = Router();

peopleRouter.get('/', async (request, response) => {
  const search: string | undefined = request.query.search as string;

  await People.execute();
  const peoples = await People.getAll({ query: search });
  return response.json({ peoples });
});

peopleRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  await People.execute();
  const people = await People.getPeopleById(id);
  return response.json({ people });
});

peopleRouter.get('/room/:id', async (request, response) => {
  const { id } = request.params;
  await People.execute();
  const peoples = await People.getPeopleByRoomId(id);
  return response.json({ peoples });
});

peopleRouter.post('/', async (request, response) => {
  const { name, lastname } = request.body;
  await People.execute();
  const people = await People.createPeople({ name, lastname });
  return response.json({ people });
});

export default peopleRouter;
