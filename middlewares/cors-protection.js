const allowedDomains = [
  'https://movies.vovitolog.nomoredomains.sbs',
  'https://api.movies.vovitolog.nomoredomains.sbs',
  'http://movies.vovitolog.nomoredomains.sbs',
  'http://api.movies.vovitolog.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedDomains.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
