export default class CustomError {
    public Message:string;
    public status:number;

    constructor(message?:string, status?:number)
    constructor(message:string, status:number) {
        this.Message = message || "";
        this.status = status || 500;
    }
}