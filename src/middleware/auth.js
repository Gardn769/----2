module.exports =  (req, res, next) => {
    if (req.isUnauthenticated()) {
      return res.status(401).json({
        error: 'Не аутентифицированый пользователь!',
        status: "error"
      })
    }
    next()
  }