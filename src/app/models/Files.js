import Sequelize, { Model } from 'sequelize';

class File extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING
			},
			{
				sequelize
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.File, { foreignKey: 'avatar_id' });
	}
}

export default File;
