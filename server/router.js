import express from 'express';

import index from 'server/handlers/index';
import keyword from 'server/handlers/upload/keyword';
import scrape from 'server/handlers/scrape/sample';
import download from 'server/handlers/download/sample';

const router = express.Router();

router.use('/', index);

router.use('/upload/keyword', keyword);

router.use('/scrape/sample', scrape);

router.use('/download/sample', download);

export default router;
download();