/**
 * @description 日志相关的工具函数
 */

import { format } from 'date-fns';

/**
 * 获取当前时间
 */
function formatNow() {
	const d = new Date();
	return format(d, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * @description 获取昨天的 Date 对象
 */
function yesterdayDate() {
	const d = new Date();
	const y = new Date(d.getTime() - 24 * 60 * 60 * 1000); // 24h 之前
	return y;
}

/**
 * @description 生成昨天日志（按天拆分）文件
 */
function genYesterdayLogFileName() {
	const y = yesterdayDate();
	const f = format(y, 'yyyy-MM-dd');
	return `${f}.log`;
}

export default {
	yesterdayDate,
	genYesterdayLogFileName,
	formatNow
};
