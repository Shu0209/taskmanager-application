const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided. Unauthorized." });
    }

    jwt.verify(token, "TMPRO", (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token expired. Please log in again." });
            }
            return res.status(403).json({ message: "Invalid token. Forbidden." });
        }


        req.user = user;
        next();
    }
    )
}

module.exports = { authenticateToken }
