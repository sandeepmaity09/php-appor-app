import * as jsonwebtoken from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRE;

export default class TokenAuth {
    constructor() { }

    public static tokenMatcher(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jsonwebtoken.verify(token, secret, function (error, decoded) {
                if (error) {
                    console.log(error);
                    console.log(token);
                    console.log(secret);
                    console.log(expire);
                    return res.json({
                        success: false,
                        message: 'Failed to Authenticate token'
                    })
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided'
            })

        }
    }

    public tokenGenerator(payload) {
        return jsonwebtoken.sign(payload, secret, { expiresIn: expire });
    }

    // private decoder(error,decode){
    //     if(error){
    //         return res.json({

    //         })
    //     }
    // }
}