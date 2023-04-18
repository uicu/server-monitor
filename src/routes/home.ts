import Koa from 'koa';
import Router from 'koa-router';
import EventModel from '../model/EventModel';
import packageInfo from '../../package.json';

const router = new Router();

router.get('/', async (ctx: Koa.Context) => {
	ctx.body = 'Hello Koa 2 monitor!';
});

router.get('/string', async (ctx: Koa.Context) => {
	ctx.body = 'koa2 string';
});

router.get('/json', async (ctx: Koa.Context) => {
	ctx.body = {
		title: 'koa2 json'
	};
});

// 测试数据库连接
router.get('/api/db-check', async (ctx: Koa.Context) => {
	// 测试 mongodb 连接
	let mongodbConn;
	try {
		mongodbConn = true;
		await EventModel.findOne();
	} catch (ex) {
		mongodbConn = false;
	}

	ctx.body = {
		errno: 0,
		data: {
			name: 'server-monitor',
			version: packageInfo.version,
			ENV: process.env.NODE_ENV,
			mongodbConn
		}
	};
});

export default router;
