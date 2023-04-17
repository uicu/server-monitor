/**
 * @description event 数据 model
 */

import mongo from '../db/mongoose';
const { Schema, model } = mongo;

const schema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		eventKey: String,
		eventData: {
			pv: Number,
			uv: Number
		},
		eventDate: Date
	},
	{ timestamps: true }
);

const EventModel = model('event_analytics_data', schema);

export default EventModel;
