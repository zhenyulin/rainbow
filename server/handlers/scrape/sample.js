import Nightmare from 'nightmare';
import cheerio from 'cheerio';
import { parsePrice } from 'server/utils/parser';
import Sample from 'server/models/sample';
import Keyword from 'server/models/keyword';
// import { TEST_KEYWORDS } from './test-keyword.js';

const START = 'https://www.ebay.co.uk';
// let INDEX = 0;

export const extractSample = (row, keyword) => {
	const item = row.find('h3.lvtitle').text().trim();
	const priceText = row.find('li.lvprice').text().trim().split(' ')[0].split('\n')[0];
	const price = parsePrice(priceText);
	const typeText = row.find('li.lvformat').text().trim();
	const type = typeText.length ? 'Bidding' : 'Buy It Now';
	const sample = new Sample({ keyword, price, type, item });
	return sample.save();
};

export const scrapeKeyword = keyword => new Promise(async (resolve, reject) => {
	const mark = `scrape keyword [${keyword}]`;
	console.time(mark);
	const nightmare = new Nightmare({show: false});

	try {
		const resultPage = await nightmare
			.goto(START)
			.insert('input#gh-ac', keyword)
			.click('input#gh-btn')
			.wait('ul#ListViewInner')
			.evaluate(() => document.body.innerHTML)
			.end();
		const $ = cheerio.load(resultPage);
		let samples = [];
		$('ul#ListViewInner li.sresult').each((i,e) => samples.push(extractSample($(e), keyword)));
		await Promise.all(samples)
			.then(() => console.timeEnd(mark))
			.catch(err => console.log(err));
		resolve();
	} catch (err) {
		reject(err);
	}
});

export const scrapeNext = async () => {
	// const keyword = TEST_KEYWORDS[INDEX];
	const result = await Keyword.findOneAndUpdate({scraped: false}, {scraped: true});
	if (result === null) { return console.log('no more unscraped keyword'); }
	const { keyword } = result;
	await scrapeKeyword(keyword);
	scrapeNext();
	// INDEX++;
	// INDEX < TEST_KEYWORDS.length ? scrapeNext() : console.log('No more unscraped keyword');
};

export default function(){
	console.log('scraper started');
	scrapeNext();
}