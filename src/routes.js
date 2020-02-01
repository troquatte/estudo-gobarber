import { Router } from 'express';
import User from './app/models/users';

const routes = new Router();

routes.get('/', async (req, res) => {
	const user = await User.create({
		name: 'Dener Troquatte2',
		email: 'd.troquatte201@yahoo.com.br',
		password_hash: '123456'
	});
	return res.json(user);
});

export default routes;
