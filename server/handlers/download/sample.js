// TODO: use d3-dsv instead of json2csv
import json2csv from 'json2csv';
import fs from 'fs';
import Sample from 'server/models/sample';

const fields = ['item', 'price', 'type', 'keyword'];

export default function () {
  console.log('start');
  console.time('loading samples from db');
  Sample.find().then((samples) => {
    console.timeEnd('loading samples from db');
    console.time('writing samples to csv');
    const csv = json2csv({ data: samples, fields });
    const namehash = Date.now();
    fs.writeFile(`data/samples/${namehash}.csv`, csv, (err) => {
      if (err) console.log(err);
      console.timeEnd('writing samples to csv');
    });
  }).catch(err => console.log(err));
}
