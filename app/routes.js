//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

import govukPrototypeKit from 'govuk-prototype-kit';
import { accountRouter } from './views/get-energy-certificate-data/router.js';

const router = govukPrototypeKit.requests.setupRouter();

router.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

router.get('/prototype-admin/clear-data', (req, res) => {
  req.session.data = {};
  res.redirect('/');
});

router.use('/get-energy-certificate-data', accountRouter);
