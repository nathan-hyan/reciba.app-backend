const JWT = require('jsonwebtoken')

const private = (req, res, next) => {

    const token = req.header('auth')

    if (!token) {
        return res.status(401).send({ success: false, message: `Access Denied` })
    } else {
        try {
            const verified = JWT.verify(token, process.env.TOKEN)
            req.user = verified
            next();
        }

        catch (err) {
            res.status(401).send({ success: false, message: `Access Denied` })
        }
    }

}

module.exports = private