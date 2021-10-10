const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token);

        if(!token) res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // -- Testing -- // 
        // console.log(`Verified: ${verified.toString()}`);
        // console.log(verified); 
        // console.log(verified.user); 

        req.user = verified.user;
        // console.log(req.user);
        next();
    } catch(err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    } 
}


function authMiddleware(req, res, next) {
    try {
        console.log(req.headers);
        const token = req.headers.authorization;
        console.log(token);

        // if(token)
        next();
    } catch(error) {
        console.log(error);
    }
}

module.exports = auth;