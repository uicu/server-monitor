/**
 * @description 检查数据库连接
 */

import server from './_server';
const { get } = server;

describe('数据库连接', () => {
	test('数据库连接', async () => {
		const { data, errno } = await get('/api/db-check');

		const { mongodbConn } = data as {
			name: string;
			version: string;
			ENV: string;
			mongodbConn: boolean;
		};

		expect(errno).toBe(0);
		expect(mongodbConn).toBe(true);
	});
});
