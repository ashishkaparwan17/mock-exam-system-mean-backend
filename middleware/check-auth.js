const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    // Get the token from authorization header
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: "Token not provided" })
    }
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (err) {
        // Catch the error if token was expired or incorrect
        return res.status(400).json({ message: "You are not authorized"});
    }
    // All the protected routes will receive this information
    req.isAdmin = decodedToken.isAdmin
    req.id = decodedToken.id
    next()
}

module.exports = checkAuth