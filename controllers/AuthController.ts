import {controller, httpPost, request} from "inversify-express-utils";
import {inject} from "inversify";
import {Request} from 'express';
import TYPES from "../constants/Types";
import UserService from "../services/UserService";

@controller('')
class AuthController {

    constructor(@inject(TYPES.UserService)private userService:UserService){}

    @httpPost('/register')
    public async registerUser(@request() req:Request) {
        return await this.userService.registerUser(req.body);
    }

    @httpPost('/login')
    public async login(@request() req:Request) {
        return await this.userService.login(req.body);
    }
}