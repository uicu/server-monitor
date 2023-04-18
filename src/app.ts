import Koa from 'koa';
import path from 'path';
import views from 'koa-views';
import json from 'koa-json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import koaStatic from 'koa-static';
import routing from './routes/index';
import cors from './middlewares/cors';
import analysis from './analysis/index';
const { splitLogFileTimed, analysisLogsTimed, rmLogsTimed } = analysis;

if (process.env.NODE_ENV && process.env.NODE_ENV.indexOf('test') !== 0) {
	// 开启定时拆分日志文件
	splitLogFileTimed();
	// 定时分析日志，结果入库
	analysisLogsTimed();
	// 定时删除过期日志文件
	rmLogsTimed();
}

const app = new Koa();

// 安装预防，设置必要的 http 头
app.use(helmet());

// onerror
onerror(app);

// 支持跨域
app.use(cors);

// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text']
	})
);
app.use(json());
app.use(logger());
// 静态资源文件夹
app.use(koaStatic(path.join(__dirname, './public')));

app.use(
	views(__dirname + '/views', {
		extension: 'pug'
	})
);

// logger
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
	const start = new Date() as unknown as number;
	await next();
	const ms = (new Date() as unknown as number) - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
routing(app);

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx);
});

export default app;
