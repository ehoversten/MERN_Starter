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


const protect = async (req, res, next) => {
    try {
        console.log(req.headers);
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        console.log(token);

        if(!token) res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // -- Testing -- // 
        // console.log(`Verified: ${verified.toString()}`);
        // console.log(verified); 
        // console.log(verified.user); 

        // Fetch User from DB 
        const user = await User.findById(verified.id)

        req.user = user;
        // console.log(req.user);
        next();
    } catch(error) {
        console.log(error);
    }
}

module.exports = auth;