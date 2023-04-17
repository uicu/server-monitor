/**
 * @description 正式环境
 */
import { ConfigParam } from '.';

const config: ConfigParam = {
	// access_log 日志文件目录，要和 nginx_conf/dev/event.conf 保持一致！
	accessLogPath: '/Users/wfp/nginx_logs/event_analytics',
	// cors origin
	corsOrigin: '*',
	distFolderName: 'logs_by_day'
};

export default config;
