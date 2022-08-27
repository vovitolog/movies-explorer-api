const { serverErrorMsg } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode === 500) {
    res
      .status(500)
      .send({
        message: `${serverErrorMsg} ${err.name}: ${err.message}`,
      });
    return;
  }
  res
    .status(err.statusCode || 500)
    .send({ message: `Произошла ошибка: ${err.message}` });
  next();
};
