import devConfig from './dev.config';
import testConfig from './test.config';
import prodConfig from './prod.config';

const { NODE_ENV } = process.env;

// 类型定义
export interface ConfigParam {
	// access_log 日志文件目录，要和 nginx_conf/dev/event.conf 保持一致！
	accessLogPath: string;
	// cors origin
	corsOrigin: string;
	// DIST_FOLDER_NAME
	distFolderName: string;
}

class GlobalConfig {
	config: ConfigParam;

	constructor() {
		this.config = this.getConfig();
	}

	getConfig() {
		let config: ConfigParam = { ...devConfig };
		switch (NODE_ENV) {
			case 'development':
				config = Object.assign(config, devConfig);
				break;
			case 'testing':
				config = Object.assign(config, testConfig);
				break;
			case 'production':
				config = Object.assign(config, prodConfig);
				break;
			default:
				config = Object.assign(config, devConfig);
		}
		return config;
	}
}

const globalConfig = new GlobalConfig();

const GLOBAL_CONFIG: ConfigParam = globalConfig.config;
export default GLOBAL_CONFIG;
