import { Application, Request, Response, NextFunction, Router } from "express";
import TokenAuth from '../auth/tokenAuth'

import UserRoutes from "../controllers/UsersCtrl";

export default class Routes {

    usersCtrl = new UserRoutes();

    constructor(app: Application) {

        const baseAPI = process.env.BASE_API;
        const authenticatedAPI = process.env.BASE_API + '/res';

        // User Management Routes
        app.route(baseAPI+'/signup').post(this.usersCtrl.signup);
        app.route(baseAPI+'/login').post(this.usersCtrl.login);
        app.route(baseAPI+'/forgot').post(this.usersCtrl.forgotPassword);
        // app.route(baseAPI+'/reset').post();

        // Using Token Authenticator as a middleware
        app.use(authenticatedAPI,TokenAuth.tokenMatcher);

        // If token authenticated then only provides this routes access
        app.route(authenticatedAPI+'/allusers').get(this.usersCtrl.getAllUsers);
    }
}