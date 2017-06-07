# rainbow [![Code Climate](https://codeclimate.com/github/zhenyulin/rainbow/badges/gpa.svg)](https://codeclimate.com/github/zhenyulin/rainbow) [![Test Coverage](https://codeclimate.com/github/zhenyulin/rainbow/badges/coverage.svg)](https://codeclimate.com/github/zhenyulin/rainbow/coverage)
A scraper example based on Nightmare.js, using ES7 async/await patterns and promise pools to benchmark performance of each batch

## About

 * Use Babel-Node to support features such as `import` that hasn't been natively support
 * Nightmare use Electron as the headless browser under the hood, so electron needs to be runnable
 * Jest for unit test with built-in coverage report, mock and assertation

## Demo

 * clone locally
 * fill your mongodb address for PRODUCTION_DB in `server/config/constant`
 * run `npm install` or `yarn`
 * run `npm run build`
 * run `npm run serve`
 * visit `http://localhost:3000/upload/keyword`, this will trigger uploading example keywords to the database
 * once finished, visit `http://localhost:3000/scrape/sample`, this will trigger the scraper to work
 * visit `http://localhost:3000/download/sample` to download the scraped data samples as csv in `data/samples`

# Develop
 * fill your mongodb address for DEVELOPMENT_DB in `server/config/constant`
 * run `npm start` to start the server or use `docker-compose up`
 * run `npm test` for unit test
 * run `npm run test:coverage` for coverage report

# ToDo
 * fix the bug of electron not stopped when stop the scraper process
 * cli implementation with `inquirer`
 * utilise mongodb bulk insert for keyword upload on top of stream control
 * add unit test for `scrape/sample`
 * add scraper example based on API request