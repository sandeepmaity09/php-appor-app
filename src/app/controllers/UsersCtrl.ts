import { NextFunction, Request, Response, Router } from 'express';
import { apiErrorHandler } from '../../handlers/errorHandler';
import UsersRepo from '../repositories/UsersRepo';
import { IUserModel, UserModel } from '../models/userModel';
import { IUserResponse, UserResponse } from '../models/response/userResponse';

export default class UsersRoutes {

    constructor() { }

    public signup(req: Request, res: Response, next: NextFunction) {

        let user: UserModel = new UserModel();
        user.uid = req.body.uid;
        user.name = req.body.name;
        user.generateHashPassword(req.body.pass);

        UsersRepo.signup(user)
            .then((result: any) => {
                // let datapack: UserModel = new UserModel(result.dataValues.uid, result.dataValues.name, result.dataValues.pass);
                res.json(user);
            })
            .catch((err) => {
                res.json(err.errors);
            });
    }

    public login(req: Request, res: Response, next: NextFunction) {

        let name = req.body.name;
        let pass = req.body.pass;

        UsersRepo.login(name)
            .then((result: any) => {
                if (result.length === 0) {
                    return res.json({
                        "message": "no user found"
                    });
                }
                let user: IUserResponse = new UserResponse(result[0].dataValues.uid,result[0].dataValues.name,result[0].dataValues.pass);
                let successflag = user.validPassword(pass);
                if (successflag) {
                    return res.json(user);
                } else {
                    return res.json({
                        "message": "invalid password"
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.json({
                    status: res.status,
                    err:err
                });
            })
    }

    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        UsersRepo.getAllUsers()
            .then((result: any) => {
                res.json({
                    status: res.status,
                    result: result
                })
            })
            .catch((err) => {
                console.log('failed')
                res.json({
                    status:res.status,
                    message:'Unable to fetch all users'
                })
            })
    }

    public forgotPassword(req: Request, res: Response, next: NextFunction) {
        if (req.body.name === undefined) {
            res.json({
                "message": "invalid request name not in body"
            })
        }
        let name = req.body.name;
        UsersRepo.forgotPassword(name)
            .then((result) => {
                console.log(result[0]);
                res.json(result[0]);
            })
            .catch((err) => {
                console.log(err);
                return res.json(err);
            })
    }
}
