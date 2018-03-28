import {injectable} from "inversify";
import {auth0Config} from "../config";
import axios from 'axios';
import {generateError} from "./ErrorService";
import Auth0LoginRequest from "../models/auth0/LoginRequest";
import User from "../models/User";
import CreateAuth0UserRequest from "../models/auth0/CreateAuth0UserRequest";
import ManagementTokenRequest from "../models/auth0/ManagementTokenRequest";
import LoginRequest from "../models/LoginRequest";

@injectable()
export default class AuthService {

    private mgmtToken:string;


    private async getMgmtToken(): Promise<string> {
        if(this.mgmtToken)
            return this.mgmtToken;

        let url = `https://${auth0Config.domain}/oauth/token`;
        let headers = {'content-type': 'application/json'};
        let request = new ManagementTokenRequest("client_credentials", auth0Config.clientId, auth0Config.clientSecret, auth0Config.audience);
        let data = JSON.stringify(request);
        let tokenHolder  = await axios.post(url, data, {headers})
            .then(response => {
                return response.data;
            });
        this.mgmtToken = tokenHolder.access_token;
        return this.mgmtToken;
    }


    public async login(loginInfo: LoginRequest): Promise<any> {
        let url = `https://${auth0Config.domain}/oauth/token`;
        let headers = {contentType: 'application/json'};
        let scope = loginInfo.includeRefresh ? "openid profile offline_access" : null;
        let loginRequest = new Auth0LoginRequest(auth0Config.clientId, auth0Config.clientSecret, loginInfo.emailAddress, loginInfo.password, null,null, scope);
        return await axios.post(url, loginRequest, {headers})
            .then(response => {
                return {idToken: response.data['id_token'], refreshToken: response.data['refresh_token']};
            }).catch(err => {
                console.error(err);
                throw generateError(err.data.error_description, err.response.status);
            });
    }

    public async registerUser(req:any): Promise<string> {
        let url = `https://${auth0Config.domain}/api/v2/users`;
        let userMetadata = {
            firstName: req.firstName,
            lastName: req.lastName
        };
        let request = new CreateAuth0UserRequest("Username-Password-Authentication",
            req.emailAddress, req.password, userMetadata, {}, false, false);
        let data = JSON.stringify(request);
        let token = await this.getMgmtToken();
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        let result = await axios.post(url, data, {headers})
            .then(response => {
               return response.data;
            })
            .catch(err => {
                throw generateError(err.data.error_description, err.response.status);
            });
        return result['user_id'];
    }

}