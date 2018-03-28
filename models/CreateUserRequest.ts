export default class CreateUserRequest {

    private _emailAddress:string;
    private _firstName:string;
    private _lastName:string;
    private _password:string;

    constructor(emailAddress?:string, firstName?:string, lastName?:string, password?:string) {
        this._emailAddress = emailAddress;
        this._firstName = firstName;
        this._lastName = lastName;
        this._password = password;
    }

    public toJSON() {
        return {
            emailAddress:this.emailAddress,
            password:this.password,
            firstName: this.firstName,
            lastName: this.lastName,
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
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
    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

}