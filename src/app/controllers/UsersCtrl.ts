import { NextFunction, Request, Response, Router } from 'express';
import { apiErrorHandler } from '../../handlers/errorHandler';
import UsersRepo from '../repositories/UsersRepo';
import { IUserModel, UserModel } from '../models/userModel';
import TokenAuth from '../auth/tokenAuth';
import userValidator from '../validators/userValidator';

export default class UsersRoutes {

    constructor() { }

    public signup(req: Request, res: Response, next: NextFunction) {

        // Check the request is valid or not
        let obj = userValidator.signupUserValidator(req);
        if (obj) {
            return res.json(obj)
        }

        // Creating a new user from model        
        let user: UserModel = new UserModel();
        user.uid = req.body.uid;
        user.name = req.body.name;
        user.mail = req.body.mail;

        user.generateHashPassword(req.body.pass);

        UsersRepo.signup(user)
            .then((result: any) => {
                // redirect the user to login after successfully creating this from frontend
                res.json({
                    success: true,
                    message: 'User Successfully Created',
                });

                // also write here the code for sending a mail to user's mail id for successfully registering
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: 'User Creation Failed',
                    error: err.message
                });
            });
    }

    public login(req: Request, res: Response, next: NextFunction) {
        let obj = userValidator.loginUserValidator(req);
        if (obj) {
            return res.json(obj);
        }

        let name = req.body.name;
        let pass = req.body.pass;

        UsersRepo.login(name)
            .then((result: any) => {
                if (result.length === 0) {
                    return res.json({
                        "message": "No user found by this name in Database"
                    });
                }

                let user = new UserModel();

                user.uid = result.dataValues.uid;
                user.name = result.dataValues.name;
                user.pass = result.dataValues.pass;

                let accountStatus = result.dataValues.status;
                
                let successflag = user.validPassword(pass);

                if (!successflag) {
                    return res.json({
                        success: false,
                        message: "invalid password"
                    });
                } else if (accountStatus === 0) {
                    return res.json({
                        success: false,
                        message: "You're account is disable, Please Contact your ADMIN"
                    })
                } else {
                    const payload = { uid: user.uid }
                    let tokenAuth = new TokenAuth();
                    var token = tokenAuth.tokenGenerator(payload);
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Promise Database Fetching Error',
                    status: res.status,
                    err: err
                });
            })
    }

    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        console.log(req['decoded']);
        UsersRepo.getAllUsers()
            .then((result: any) => {
                res.json({
                    success: true,
                    message: 'All Users Success',
                    status: res.status,
                    result: result
                })
            })
            .catch((err) => {
                // console.log('failed')
                res.json({
                    success: false,
                    status: res.status,
                    message: 'Unable to fetch all users'
                })
            })
    }

    public forgotPassword(req: Request, res: Response, next: NextFunction) {
        let obj = userValidator.forgotUserValidator(req);
        if (obj) {
            return res.json(obj);
        }

        let name = req.body.name;

        UsersRepo.forgotPassword(name)
            .then((result: any) => {
                if (result.length === 0) {
                    return res.json({
                        "message": "No user found by this username in database"
                    });
                }
                // console.log(result[0]);
                // res.json(result[0]);
                let email = result.dataValues.mail;
            })
            .catch((err) => {
                console.log(err);
                return res.json(err);
            })
    }
}
