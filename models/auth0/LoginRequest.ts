import {auth0Config} from "../../config";

export default class LoginRequest {
    private _client_id:string;
    private _client_secret:string;
    private _username:string;
    private _password:string;
    private _grant_type:string;
    private _audience:string;
    private _scope:string;
    private _realm:string = "Username-Password-Authentication";

    constructor(clientId?:string, clientSecret?:string, username?:string,password?:string, grantType?:string, audience?:string,scope?:string) {
        this._client_id = clientId || auth0Config.clientId;
        this._client_secret = clientSecret || auth0Config.clientSecret;
        this._username = username || "";
        this._password = password || "";
        this._grant_type = grantType || auth0Config.grant_type;
        this._audience = audience || auth0Config.audience;
        this._scope = scope || "openid profile";
    }


    public toJSON() {
        return {
            client_id: this.client_id,
            client_secret: this.client_secret,
            username: this.username,
            password: this.password,
            grant_type: this.grant_type,
            audience: this.audience,
            scope: this.scope,
            realm: this.realm
        }
    }


    get realm(): string {
        return this._realm;
    }

    set realm(value: string) {
        this._realm = value;
    }
    get scope(): string {
        return this._scope;
    }

    set scope(value: string) {
        this._scope = value;
    }
    get audience(): string {
        return this._audience;
    }

    set audience(value: string) {
        this._audience = value;
    }
    get grant_type(): string {
        return this._grant_type;
    }

    set grant_type(value: string) {
        this._grant_type = value;
    }
    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }
    get client_secret(): string {
        return this._client_secret;
    }

    set client_secret(value: string) {
        this._client_secret = value;
    }
    get client_id(): string {
        return this._client_id;
    }

    set client_id(value: string) {
        this._client_id = value;
    }
}