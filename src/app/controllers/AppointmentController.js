import * as Yup from 'yup';
import { isBefore, startOfHour, parseISO, isFuture } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
	async index(req, res) {
		const { page = 1 } = req.query;

		const find = await Appointment.findAll({
			where: {
				user_id: req.userId,
				canceled_at: null
			},
			order: ['date'],
			attributes: ['id', 'date'],
			limit: 20,
			offset: (page - 1) * 20,
			include: [
				{
					model: User,
					as: 'provider',
					attributes: ['id', 'name'],
					include: [
						{
							model: File,
							as: 'avatar',
							attributes: ['id', 'path', 'url']
						}
					]
				}
			]
		});

		return res.json(find);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			provider_id: Yup.number().required(),
			date: Yup.date().required()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}
		const { provider_id, date } = req.body;

		const isProvider = await User.findOne({
			where: { id: provider_id, provider: true }
		});

		if (!isProvider) {
			return res.status(401).json({ error: 'You can only creat providers' });
		}

		const hourStart = startOfHour(parseISO(date));

		if (isBefore(hourStart, new Date())) {
			return res.status(400).json({ error: 'Pass dates are not permitted' });
		}

		const checkAvalability = await Appointment.findOne({
			where: {
				provider_id,
				canceled_at: null
			}
		});

		if (checkAvalability) {
			return res.status(400).json({ error: 'Appointment date is not Avaliable' });
		}

		const appointment = await Appointment.create({
			user_id: req.userId,
			provider_id,
			date: hourStart
		});

		return res.json({ status: appointment });
	}
}

export default new AppointmentController();
