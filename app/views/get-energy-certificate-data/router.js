import express from 'express';

export const accountRouter = express.Router()

accountRouter.use('/authenticated', function (req, res, next) {
  if (!req.session.data.signedIn) {
    const referer = req.query.referer || req.originalUrl;
    delete req.session.data.referer;
    if (referer.startsWith('/get-energy-certificate-data')) {
      req.session.data.referer = referer;
    } 
    res.redirect('/get-energy-certificate-data/one-login')
  } else {
    next();
  }
});

accountRouter.post('/way-to-access-data', function (req, res, next) {
  const accessType = req.body.access_type

  if (accessType === 'download') {
    return res.redirect('/get-energy-certificate-data/authenticated/type-of-properties')
  }

  if (accessType === 'api') {
    return res.redirect('/get-energy-certificate-data/use-api')
  }

  next();
})

accountRouter.post('/authenticated/type-of-properties', function (req, res, next) {
  const type = req.body.type_of_properties

  if (type === 'domestic') {
    return res.redirect('/get-energy-certificate-data/authenticated/domestic-properties')
  }

  if (type === 'non-domestic') {
    return res.redirect('/get-energy-certificate-data/authenticated/non-domestic-properties')
  }

  if (type === 'display') {
    return res.redirect('/get-energy-certificate-data/authenticated/public-properties')
  }

  next();
})

accountRouter.post('/one-login', function (req, res) {
  req.session.data.signedIn = true;
  const referer = req.session.data.referer || '/get-energy-certificate-data/authenticated/my-account';
  delete req.session.data.referer;
  res.redirect(referer);
});

accountRouter.post('/authenticated/delete-account', function (req, res) {
  req.session.data.signedIn = true;
  res.redirect('/get-energy-certificate-data/account-deleted');
});

accountRouter.get('/sign-out', function (req, res, next) {
  if (req.session.data.signedIn) {
    req.session.data = {};
    return res.redirect('/get-energy-certificate-data/sign-out');
  }
  next();
});
