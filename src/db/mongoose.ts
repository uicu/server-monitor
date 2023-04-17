/**
 * @description 封装 mongoose ，连接 mongodb
 */

import mongoose from 'mongoose';
import config from '../config';
const { host, port, dbName, user, password } = config.mongodbConf;

// 拼接连接字符串
let url = `mongodb://${host}:${port}`; // dev 环境
if (user && password) {
	url = `mongodb://${user}:${password}@${host}:${port}`; // prd 环境
}

// 全局配置：禁用strictQuery来覆盖默认
mongoose.set('strictQuery', false);

// 开始连接（ 使用用户名和密码时，需要 `?authSource=admin` ）
mongoose.connect(`${url}/${dbName}?authSource=admin`);

// 连接对象
const db = mongoose.connection;

db.on('error', err => {
	console.error('mongoose connect error', err);
});

// // 演示注释掉即可
// db.once('open', () => {
//     // 用以测试数据库连接是否成功
//     console.log('mongoose connect success')
// })

export default mongoose;
