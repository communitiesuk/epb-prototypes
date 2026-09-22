//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

import govukPrototypeKit from 'govuk-prototype-kit';
import { accountRouter } from './views/get-energy-certificate-data/router.js';

const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.get('/healthcheck', function(_, response) {
  response.sendStatus(200)
})

router.use('/get-energy-certificate-data', accountRouter);
