export default class CustomError {
    public message:string;
    public status:number;

    constructor(message?:string, status?:number)
    constructor(message:string, status:number) {
        this.message = message || "";
        this.status = status || 500;
    }
}