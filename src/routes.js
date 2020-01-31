import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
	return res.json({ message: 'Babilonia 2323' });
});

export default routes;
