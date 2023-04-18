/**
 * @description 拆分日志文件 test
 */

import path from 'path';
import fse from 'fs-extra';
import splitLogFile from '../../src/analysis/split-log-file/index';
import rmLogs from '../../src/analysis/rm-logs/index';
import analysisLogs from '../../src/analysis/analysis-logs/analysis';
import util from '../../src/analysis/utils/util';
const { genYesterdayLogFileName, genOldLogFileName } = util;

const LOGS_FOLDER_PATH = path.join(__dirname, 'logs');
const ACCESS_LOG_TXT_PATH = path.join(__dirname, 'access.log.txt');
const ACCESS_LOG_PATH = path.join(LOGS_FOLDER_PATH, 'access.log');
// logs_by_day常量，如果src 下 config 配置 distFolderName字段修改了，这里要同步修改
const SPLIT_LOGS_FOLDER_PATH = path.join(LOGS_FOLDER_PATH, 'logs_by_day');

describe('日志操作', () => {
	beforeEach(() => {
		// 清空所有日志，每次 test 都重新创建，避免相互影响（重要）
		if (fse.existsSync(LOGS_FOLDER_PATH)) fse.removeSync(LOGS_FOLDER_PATH);

		// 创建日志目录
		fse.ensureDirSync(LOGS_FOLDER_PATH);
		// 写入 access.log （拷贝）
		fse.copySync(ACCESS_LOG_TXT_PATH, ACCESS_LOG_PATH);
	});

	test('按天拆分日志文件', () => {
		// 拆分日志
		splitLogFile(LOGS_FOLDER_PATH);

		// 检查拆分出来的日志
		const splitLogFileName = path.join(
			SPLIT_LOGS_FOLDER_PATH,
			genYesterdayLogFileName()
		);
		// console.log('splitLogFileName', splitLogFileName)
		const isExist = fse.existsSync(splitLogFileName);
		expect(isExist).toBe(true);
	});

	test('删除历史日志文件', () => {
		// 模拟一个历史日志
		fse.ensureDirSync(SPLIT_LOGS_FOLDER_PATH);
		const oldLogFileName = genOldLogFileName(100); // 100 天之前的日志文件
		const oldLogFilePath = path.join(SPLIT_LOGS_FOLDER_PATH, oldLogFileName);
		fse.ensureFileSync(oldLogFilePath);

		// 删除历史日志
		rmLogs(LOGS_FOLDER_PATH);

		// 判断是否删除
		const isExist = fse.existsSync(oldLogFilePath);
		expect(isExist).toBe(false);
	});

	test('分析日志结果', async () => {
		// 先拆分日志
		splitLogFile(LOGS_FOLDER_PATH);
		// 再分析日志
		const result = await analysisLogs(LOGS_FOLDER_PATH);
		// 对比结果 —— 和 `access.log.txt` 的数据一致
		expect(result.h5).toEqual({ pv: 28 });
		expect(result['h5.pv']).toEqual({ pv: 28 });
		expect(result['h5.pv.85']).toEqual({ pv: 9 });
		expect(result['h5.pv.85.41']).toEqual({ pv: 5 });
		expect(result['h5.pv.85.42']).toEqual({ pv: 4 });
		expect(result['h5.pv.86']).toEqual({ pv: 19 });
		expect(result['h5.pv.86.42']).toEqual({ pv: 8 });
		expect(result['h5.pv.86.41']).toEqual({ pv: 11 });
	});
});
