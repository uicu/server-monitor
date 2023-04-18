/**
 * @description event route
 */

import Router from 'koa-router';
import controllerEventData from '../controller/event-data';

const { getEventData } = controllerEventData;

// 路由前缀
const router = new Router({
	prefix: '/api/event'
});

// 获取 event 统计数据
router.get('/', async ctx => {
	const { category, action, label, value, startDate, endDate } = ctx.query as {
		category: string;
		action: string;
		label: string;
		value: string;
		startDate: string;
		endDate: string;
	};

	const res = await getEventData(
		{ category, action, label, value },
		startDate,
		endDate
	);
	ctx.body = res;
});

export default router;
