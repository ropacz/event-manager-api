import { Router } from 'express';

import SpaceController from '../controllers/SpaceController';

const Space = new SpaceController();

const spaceRouter = Router();

spaceRouter.get('/', async (request, response) => {
  const search: string | undefined = request.query.search as string;

  await Space.execute();
  const spaces = await Space.getAll({ query: search });
  return response.json({ spaces });
});

spaceRouter.post('/', async (request, response) => {
  const { name, capacity } = request.body;
  await Space.execute();
  const space = await Space.createSpace({ name, capacity });
  return response.json({ space });
});

spaceRouter.post('/edit/people', async (request, response) => {
  const { spaceId, peopleIds } = request.body;
  await Space.execute();
  const space = await Space.editPeopleInSpace(spaceId, peopleIds);
  return response.json(space);
});

spaceRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  await Space.execute();
  const { space, people } = await Space.getSpaceById(id);
  return response.json({ space, people });
});

export default spaceRouter;
