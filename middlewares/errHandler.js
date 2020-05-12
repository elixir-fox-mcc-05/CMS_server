const errHandler = (err, req, res, next) => {
  if (
    err.name == 'SequelizeValidationError' ||
    err.name == 'SequelizeUniqueConstraintError'
  ) {
    const errors = err.errors.map(el => ({
      message: el.message
    }));
    res.status(400).json({
      errors
    });
  } else if (err.name == 'JsonWebTokenError') {
    res.status(401).json({
      message: `Please Login First!`
    });
  } else {
    console.log(err);
    res.status(err.code || 500).json({
      errors: err
    });
  }
};

module.exports = errHandler;
