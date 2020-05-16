module.exports = (err, req, res, next) => {
    if (err.name == "JsonWebTokenError") {
      res.status(401).json({
        msg: "please login first",
      });
    } else if (err.name == "SequelizeValidationError") {
      const errors = err.errors.map((el) => ({
        message: el.message,
      }));
      res.status(400).json({
        code: 400,
        type: "Bad Request",
        errors,
      });
    } else if (err.name == "SequelizeUniqueConstraintError") {
      res.status(400).json({
        msg: "email already in use",
      });
    } else {
      res.status(err.code || 500).json({
        err: err,
      });
    }
  };
  