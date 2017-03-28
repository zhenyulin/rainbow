import colors from 'colors/safe';
import csvParser from 'csv-parser';
import fs from 'fs';
import Keyword from 'server/models/keyword';

const SOURCE_FILE = 'data/keywords/1k.csv';
const BULK_SIZE = 10000;

export default async function(){
	let total = 0;
	let counter = 0;
	let unresolved = 0;
	let saves = [];
	console.time(`Importing data from ${SOURCE_FILE}`);
	const stream = fs.createReadStream(SOURCE_FILE).pipe(csvParser());
	stream.on('error', err => console.log(err));
	stream.on('data', row => {
		if(unresolved > BULK_SIZE){
			stream.pause();
		}
		const save = new Promise((resolve, reject) => {
			const keyword = new Keyword({
				keyword: row.word,
				scraped: false,
			});
			keyword.save().then(() => {
				counter++;
				unresolved--;
				if(stream.isPaused() && unresolved < 1){
					stream.resume();
				}
				console.log(`new word: ${row.word}`);
				resolve();
			})
			.catch(err => {
				if (err.code === 11000){
					console.log(colors.grey(`existed: ${row.word}`));
				}
				else {
					// reject(err.message);
					console.log(err.message);
				}
				unresolved--;
				if(stream.isPaused() && unresolved < 1){
					stream.resume();
				}
				resolve();
			});
		});
		saves.push(save);
		unresolved++;
		total++;
	});
	stream.on('end', async () => {
		await Promise.all(saves);
		console.timeEnd(`Importing data from ${SOURCE_FILE}`);
		console.log(`added ${counter}/${total} samples`);
	});
}