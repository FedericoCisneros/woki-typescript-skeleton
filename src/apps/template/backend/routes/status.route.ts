import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/StatusGetController';
import {version} from './index';

export const register = (router: Router) => {
  const controller: StatusController = container.get('Apps.mooc.controllers.StatusGetController');
  router.get(version + '/status', (req: Request, res: Response) => controller.run(req, res));
};
