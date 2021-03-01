import { Router } from 'express';

import peopleRouter from './people.routes';
import roomRouter from './room.routes';
import spaceRouter from './space.routes';

const routes = Router();

routes.use('/people', peopleRouter);
routes.use('/room', roomRouter);
routes.use('/space', spaceRouter);

export default routes;
