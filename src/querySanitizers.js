
const queryParamsToLower = (req, res, next) => {
  for (let key in req.query) {
    if ((key.toLowerCase() === key) == false) {
      req.query[key.toLowerCase()] = req.query[key]
      delete req.query[key]
    }
  }
  next();
}

module.exports = { queryParamsToLower };