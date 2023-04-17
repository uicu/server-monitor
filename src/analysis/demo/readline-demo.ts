/**
 * @description readline demo
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

function main() {
	let num = 0;

	const logFile = path.join(__dirname, 'files', 'test.txt');
	const readStream = fs.createReadStream(logFile);
	const rl = readline.createInterface({
		input: readStream
	});
	rl.on('line', line => {
		console.log('line', line);
		num++;
	});
	rl.on('close', async () => {
		console.log('num', num);
	});
}
main();
