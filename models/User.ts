export default class User {
    private _firstName:string;
    private _lastName:string;
    private _emailAddress:string;
    private _userId:string;
    private _auth0Id:string;
    private _refreshToken:string;

    constructor(firstName?:string, lastName?:string, emailAddress?:string, userId?:string, auth0Id?:string,refreshToken?:string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._emailAddress = emailAddress;
        this._userId = userId;
        this._auth0Id = auth0Id;
        this._refreshToken = refreshToken;
    }

    get auth0Id(): string {
        return this._auth0Id;
    }

    set auth0Id(value: string) {
        this._auth0Id = value;
    }
    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }
    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }
    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }
    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }
    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }


    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            emailAddress:this.emailAddress,
            userId: this.userId,
            auth0Id: this.auth0Id,
            refreshToken: this.refreshToken
        }
    }


}