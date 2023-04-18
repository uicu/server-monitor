/**
 * @description 分析日志
 */

import analysisLogs from './analysis';
import writeDB from './writeDB';

/**
 * 分析日志文件，结果入库
 */
async function analysisLogsAndWriteDB(accessLogPath: string) {
	const result = await analysisLogs(accessLogPath);
	await writeDB(result);
	console.log('----------- 日志结果入库 完成 -----------');
}

export default analysisLogsAndWriteDB;
