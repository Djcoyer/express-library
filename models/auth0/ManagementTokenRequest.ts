export default class ManagementTokenRequest {
    private _grantType:string;
    private _clientId:string;
    private _clientSecret:string;
    private _audience:string;

    constructor(grantType?:string, clientId?:string, clientSecret?:string, audience?:string) {
        this._grantType = grantType;
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._audience = audience;
    }


    public toJSON() {
        return {
            audience: this.audience,
            grant_type: this.grantType,
            client_id: this.clientId,
            client_secret: this.clientSecret
        }
    }

    get audience(): string {
        return this._audience;
    }

    set audience(value: string) {
        this._audience = value;
    }
    get clientSecret(): string {
        return this._clientSecret;
    }

    set clientSecret(value: string) {
        this._clientSecret = value;
    }
    get clientId(): string {
        return this._clientId;
    }

    set clientId(value: string) {
        this._clientId = value;
    }
    get grantType(): string {
        return this._grantType;
    }

    set grantType(value: string) {
        this._grantType = value;
    }
}