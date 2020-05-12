function error_handler(err, req, res, next) {
    if (err.name) {
        res
          .status(err.code)
          .json({ name: err.name, detail: err.message })
    }
}

module.exports = error_handler 