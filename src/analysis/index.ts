/**
 * @description 分析日志 入口
 */
import fse from 'fs-extra';
import { CronJob } from 'cron';
/**
    schedule 定时规则 https://www.npmjs.com/package/node-schedule
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
 */
import splitLogFile from './split-log-file/index';
import config from '../config';

const { accessLogPath } = config;

// 判断 accessLogPath 是否存在，读取 accessLogPath 的内容
const accessLogPathFiles = fse.readdirSync(accessLogPath);
console.log(
	'accessLogPath 是否存在',
	accessLogPath,
	fse.pathExistsSync(accessLogPath)
);
console.log('accessLogPath 自文件', accessLogPathFiles);

/**
 * 开始定时任务
 */
function schedule(cronTime: string, onTick: () => void) {
	if (!cronTime) return;
	if (typeof onTick !== 'function') return;

	// 创建定时任务
	const c = new CronJob(
		cronTime,
		onTick,
		null, // onComplete 何时停止任务，null
		true, // 初始化之后立刻执行，否则要执行 c.start() 才能开始
		'Asia/Shanghai' // 时区，重要！！
	);

	// 进程结束时，停止定时任务
	process.on('exit', () => c.stop());
}

/**
 * 定时拆分日志文件
 */
function splitLogFileTimed() {
	const cronTime = '0 0 0 * * *'; // 每天的 0:00:00
	schedule(cronTime, splitLogFile);
	console.log('定时拆分日志文件', cronTime);
}

export default {
	splitLogFileTimed
};
