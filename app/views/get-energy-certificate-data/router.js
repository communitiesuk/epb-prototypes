import { randomInt } from 'node:crypto';
import govukPrototypeKit from 'govuk-prototype-kit';

const alphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomToken(length) {
  return Array.from(
    { length },
    () => alphabet[randomInt(alphabet.length)],
  ).join('');
}

export const accountRouter = govukPrototypeKit.requests.setupRouter();

accountRouter.use('/', (req, res, next) => {
  if (req.method === 'GET') {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
  }
  next();
});

accountRouter.use('/authenticated', (req, res, next) => {
  if (!req.session.data.signedIn) {
    const referer = req.query.referer || req.originalUrl;
    delete req.session.data.referer;
    if (referer.startsWith('/get-energy-certificate-data')) {
      req.session.data.referer = referer;
    }
    res.redirect('/get-energy-certificate-data/one-login');
  } else {
    next();
  }
});

accountRouter.post('/way-to-access-data', (req, res, next) => {
  const accessType = req.body.access_type;

  if (accessType === 'download') {
    return res.redirect(
      '/get-energy-certificate-data/authenticated/type-of-properties',
    );
  }

  if (accessType === 'api') {
    return res.redirect('/get-energy-certificate-data/use-api');
  }

  next();
});

accountRouter.post('/authenticated/type-of-properties', (req, res, next) => {
  const type = req.body.type_of_properties;

  if (type === 'domestic') {
    return res.redirect(
      '/get-energy-certificate-data/authenticated/domestic-properties',
    );
  }

  if (type === 'non-domestic') {
    return res.redirect(
      '/get-energy-certificate-data/authenticated/non-domestic-properties',
    );
  }

  if (type === 'display') {
    return res.redirect(
      '/get-energy-certificate-data/authenticated/public-properties',
    );
  }

  next();
});

accountRouter.post('/one-login', (req, res) => {
  const referer =
    req.session.data.referer ||
    '/get-energy-certificate-data/authenticated/my-account';

  req.session.data.bearerTokens ??= [
    { createdAt: new Date(2026, 0, 1), value: randomToken(22) },
  ];
  req.session.data.subscribed ??= true;
  req.session.data.email ??= 'sparkle.rath@osinski-shields.test';
  req.session.data.signedIn = true;
  delete req.session.data.referer;

  res.redirect(referer);
});

accountRouter.post('/authenticated/delete-account', function (req, res) {
  req.session.data = {};
  res.redirect('/get-energy-certificate-data/account-deleted');
});

accountRouter.post('/sign-out', function (req, res) {
  req.session.data.signedIn = false;
  return res.redirect('/get-energy-certificate-data/sign-out');
});

accountRouter.post('/authenticated/create-bearer-token', function (req, res) {
  req.session.data.bearerTokens.push({
    createdAt: new Date(),
    value: randomToken(22),
  });
  req.session.flash = 'Bearer token created';
  res.redirect('/get-energy-certificate-data/authenticated/my-account');
});

accountRouter.get(
  '/authenticated/create-legacy-bearer-token',
  function (req, res) {
    req.session.data.bearerTokens.push({
      createdAt: new Date(),
      value: randomToken(64),
    });
    req.session.flash = 'Bearer token created';
    res.redirect('/get-energy-certificate-data/authenticated/my-account');
  },
);

accountRouter.post('/authenticated/delete-bearer-token', function (req, res) {
  const index = req.session.data.index;
  delete req.session.data.index;
  req.session.data.bearerTokens.splice(index, 1);
  req.session.flash = 'Bearer token deleted';
  res.redirect('/get-energy-certificate-data/authenticated/my-account');
});

accountRouter.post('/authenticated/service-updates', function (req, res) {
  const subscribed = req.session.data.subscribed === 'true';
  req.session.data.subscribed = subscribed;
  if (subscribed) {
    req.session.flash = 'Subscribed to service update emails';
  } else {
    req.session.flash = 'Unsubscribed from service update emails';
  }
  res.redirect('/get-energy-certificate-data/authenticated/my-account');
});

// Unused alternative
accountRouter.post('/authenticated/subscribe', function (req, res) {
  req.session.data.subscribed = true;
  req.session.flash = 'Subscribed to service update emails';
  res.redirect('/get-energy-certificate-data/authenticated/my-account');
});

// Unused alternative
accountRouter.post('/authenticated/unsubscribe', function (req, res) {
  req.session.data.subscribed = false;
  req.session.flash = 'Unsubscribed from service update emails';
  res.redirect('/get-energy-certificate-data/authenticated/my-account');
});
