/**
 * @description 测试环境
 */
import { ConfigParam } from '.';

const config: ConfigParam = {
	mongodbConf: {
		host: '127.0.0.1',
		user: '',
		password: '',
		port: 27017,
		dbName: 'server-monitor'
	},
	// access_log 日志文件目录，要和 nginx_conf/dev/event.conf 保持一致！
	accessLogPath: '/Users/wfp/nginx_logs/event_analytics',
	// cors origin
	corsOrigin: '*',
	distFolderName: 'logs_by_day'
};

export default config;
