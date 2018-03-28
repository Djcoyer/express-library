export default class LoginRequest {
    private _emailAddress:string;
    private _password:string;
    private _includeRefresh: boolean;


    public toJSON() {
        return {
            emailAddress: this.emailAddress,
            password: this.password,
            includeRefresh: this.includeRefresh
        }
    }


    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }
    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
    get includeRefresh(): boolean {
        return this._includeRefresh;
    }

    set includeRefresh(value: boolean) {
        this._includeRefresh = value;
    }
}