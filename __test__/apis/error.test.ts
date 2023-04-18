/**
 * @description 检查参数不全的情况
 */

import server from './_server';
const { get } = server;

describe('参数不全时返回错误', () => {
	test('没有 category 和 action', async () => {
		const { errno } = await get('/api/event');
		expect(errno).toBe(10001);
	});

	test('没有开始结束时间', async () => {
		const { errno } = await get('/api/event?category=h5&action=pv');
		expect(errno).toBe(10002);
	});
});
