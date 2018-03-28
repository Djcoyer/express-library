import {inject, injectable} from "inversify";
import TYPES from "../constants/Types";
import UserRepository from "../repositories/UserRepository";
import {generateError} from "./ErrorService";
import AuthService from "./AuthService";
import CreateUserRequest from "../models/CreateUserRequest";
import CreateAuth0UserRequest from "../models/auth0/CreateAuth0UserRequest";
import User from "../models/User";

const uuid = require('uuid/v4');

@injectable()
export default class UserService {

    constructor(@inject(TYPES.UserRepository) private userRepository:UserRepository,
                @inject(TYPES.AuthService)private authService:AuthService) {}

    public async registerUser(req:any):Promise<any> {
        let request = req as CreateUserRequest;
        let auth0Id = await this.authService.registerUser(request);
        console.log(auth0Id);
        let {firstName, lastName, emailAddress} = request;
        let user = new User(firstName,lastName,emailAddress,uuid(),auth0Id,null);
        return await this.userRepository.putUser(user);
    }

    public async login(loginInfo:any) :Promise<any>{
        let dbUser = await this.userRepository.findByEmailAddress(loginInfo.emailAddress);
        if(!dbUser) {
            console.error(`User with email address ${loginInfo.emailAddress} not found in database`);
            throw generateError("User with email address not found", 404);
        }
        let tokens = await this.authService.login(loginInfo);
        let refreshToken = tokens.refreshToken;
        let user = new User(dbUser.firstName, dbUser.lastName, dbUser.emailAddress, dbUser.userId, dbUser.auth0Id, refreshToken);
        await this.userRepository.putUser(user);
        return {idToken: tokens.idToken};
    }

    private validateUser(user:any):void {
        if(!user)
            throw generateError("Must include a user in the request", 400);
        if(!user.firstName || !user.lastName)
            throw generateError("Must include first and last name in request", 400);
        if(!user.emailAdress)
            throw generateError("Must include email address in request", 400);
    }
};