import colors from 'colors/safe';
import csvParser from 'csv-parser';
import fs from 'fs';
import Keyword from 'server/models/keyword';

const SOURCE_FILE = 'data/keywords/1k.csv';

export default async function(){
	let total = 0;
	let counter = 0;
	let saves = [];
	console.time(`Importing data from ${SOURCE_FILE}`);
	const stream = fs.createReadStream(SOURCE_FILE).pipe(csvParser());
	stream.on('data', row => {
		total++;
		const save = new Promise((resolve, reject) => {
			const keyword = new Keyword({
				keyword: row.word,
				scraped: false,
			});
			keyword.save().then(() => {
				counter++;
				console.log(`new word: ${row.word}`);
				resolve();
			})
			.catch(err => {
				if (err.code === 11000){
					console.log(colors.grey(`existed: ${row.word}`));
					resolve();
				}
				else {
					reject(err.message);
				}
			});
		});
		saves.push(save);
	});
	stream.on('end', () => {
		Promise.all(saves).then(() => {
			console.log(`added ${counter}/${total} samples`);
			console.timeEnd(`Importing data from ${SOURCE_FILE}`);
		}).catch(err => console.log(err));
	});
}