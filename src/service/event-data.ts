/**
 * @description 操作数据库 event data
 */

import EventModel from '../model/EventModel';

/**
 * 创建事件数据，可多个
 */
async function createEventsService(
	eventDataList: {
		eventKey: string;
		eventData: { pv?: number; uv?: number };
		eventDate: Date;
	}[]
) {
	const results = await EventModel.create(eventDataList);
	return results.length;
}

/**
 * 获取统计数据
 */
async function findEventsService(opts = {}, startDate: Date, endDate: Date) {
	Object.assign(opts, {
		eventDate: { $gte: startDate, $lt: endDate }
	});
	const res = await EventModel.find(opts);
	return res;
}

export default {
	createEventsService,
	findEventsService
};
