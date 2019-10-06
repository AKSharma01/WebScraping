'use strict';


const constants = require(rootDir+"/utils/constants")

module.exports = (sequelize, DataTypes) => {
	const HyperLink = sequelize.define(constants.HYPERLINK, {
		id: {
			primaryKey: true, 
			type: DataTypes.STRING, 
			allowNull: false, 
			unique: true,
			validate: {
				isUUID: 4
			}
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		},
		count: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		params: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
			defaultValue: []
		},
		is_delete: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			set (value) {
				this.setDataValue('is_delete', value);
				this.setDataValue('deleted_at', (value? (new Date()): null));
			}
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: null
		},
	}, {
		paranoid: true,
		underscored: true,
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at"
	})

	HyperLink.addHook("beforeValidate", (link) => {
		link.id = uuid();
	})
}