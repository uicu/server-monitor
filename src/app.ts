import Koa from 'koa';
import path from 'path';
import views from 'koa-views';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaStatic from 'koa-static';
import index from './routes/index';

const app = new Koa();

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
app.use(index.routes());
app.use(index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx);
});

export default app;
