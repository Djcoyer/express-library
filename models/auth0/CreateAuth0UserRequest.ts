export default class CreateAuth0UserRequest {
    public connection:string;
    public email:string;
    public password:string;
    public user_metadata:object;
    public app_metadata:object;
    public email_verified:boolean;
    public verify_email:boolean;

    constructor(connection?:string,email?:string,password?:string,userMetadata?:object,appMetadata?:object,emailVerified?:boolean,verifyEmail?:boolean) {
        this.connection = connection;
        this.email = email;
        this.password = password;
        this.user_metadata = userMetadata;
        this.app_metadata = appMetadata;
        this.email_verified = emailVerified;
        this.verify_email = verifyEmail;
    }

}