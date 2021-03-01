import { Router } from 'express';

import RoomController from '../controllers/RoomController';

const Room = new RoomController();

const roomRouter = Router();

roomRouter.get('/', async (request, response) => {
  const search: string | undefined = request.query.search as string;
  await Room.execute();
  const rooms = await Room.getAll({ query: search });
  return response.json({ rooms });
});

roomRouter.post('/', async (request, response) => {
  const { name, capacity } = request.body;
  await Room.execute();
  const room = await Room.createRoom({ name, capacity });
  return response.json({ room });
});

roomRouter.post('/edit/people', async (request, response) => {
  const { roomId, peopleIds } = request.body;

  await Room.execute();
  const people = await Room.editPeopleInRoom(roomId, peopleIds);
  return response.json(people);
});

roomRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  await Room.execute();
  const { room, people } = await Room.getRoomById(id);
  return response.json({ room, people });
});

export default roomRouter;
