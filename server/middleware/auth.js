const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token);

        if(!token) res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // -- Testing -- // 
        console.log(`Verified: ${verified}`);

        res.user = verified.user;
        next();
    } catch(err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    } 
}

modules.export = auth;