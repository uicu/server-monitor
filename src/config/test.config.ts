/**
 * @description 测试环境
 */
import { ConfigParam } from '.';

const config: ConfigParam = {
	mongodbConf: {
		host: 'docker-host',
		user: '',
		password: '',
		port: 27016,
		dbName: 'server-monitor'
	},
	// access_log 日志文件目录，见 nginx_conf/test/event.conf 和 Dockerfile
	accessLogPath: '/app/nginx_logs/server-monitor',
	// cors origin
	corsOrigin: '*',
	distFolderName: 'logs_by_day'
};

export default config;
