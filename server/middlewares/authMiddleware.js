const jwt = require("jsonwebtoken");

//next() to pass next step of the route
const auth = (req, res, next) =>{
    try {
        console.log("req headers", req.headers.authorization);//Bearer asdfjhdf1231.asdasf.asssfg
        const token = req.headers.authorization.split(" ")[1];
        console.log("token", token);
        //we used secret key for signature in token, now we will use secret key to verify
        // weather token has been tampered or not.
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verified token", verifiedToken);
        req.body.userId = verifiedToken.userId;
        //now we will know the user id, so any other req is sent, user will be known.
        next();//pass control to next thing in cycle
    } catch (error) {
        return res
        .status(401)
        .send({success: false, message:"Token is not valid"});
    }
}

module.exports = auth;