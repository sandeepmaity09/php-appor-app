import { Application, Request, Response, NextFunction, Router } from "express";
import TokenAuth from '../auth/tokenAuth'

import UserRoutes from "../controllers/UsersCtrl";

export default class Routes {

    usersCtrl = new UserRoutes();

    constructor(app: Application) {
        app.route('/api/signup').post(this.usersCtrl.signup);
        // app.use(TokenAuth.tokenMatcher);
        app.route('/api/login').post(this.usersCtrl.login);
        app.route('/api/forgot').post(this.usersCtrl.forgotPassword);
        app.use('/api',TokenAuth.tokenMatcher);
        app.route('/api/allusers').get(this.usersCtrl.getAllUsers);
    }
}