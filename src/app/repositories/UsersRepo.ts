import { User } from '../../db/dbmodels/User'
import { LoginUser } from '../../db/dbmodels/LoginUser';
import { SignupUser } from '../../db/dbmodels/SignupUser'
import { ForgotPassword } from '../../db/dbmodels/ForgotPassword';

class UsersRepo {
    constructor() {}

    login(name){
        return User.findAll({where:{'name':name}});
    }

    signup(props:any){
        let obj:any = User.build(props);
        return obj.save();
    }

    getAllUsers(){
        return User.findAll({attributes:['name','pass']});
        // return User.findAll();
        
    }

    forgotPassword(name){
        return User.findAll({where:{'name':name}});
    }
}

export default new UsersRepo();