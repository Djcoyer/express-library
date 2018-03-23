
export class Reservation {
    private id:string;
    private bookId:string;
    private startDate:string;
    private endDate:string;
    private userId:string;
    private returnedDate:string;


    constructor(id?, bookId?, startDate?, endDate?, userId?, returnedDate?) {
        this.id = id || "";
        this.bookId = bookId || "";
        this.startDate = startDate || new Date();
        this.endDate = endDate || null;
        this.userId = userId || "";
        this.returnedDate = returnedDate || null;
    }

    public getId():string {
        return this.id;
    }

    public setId(id:string):void {
        this.id = id;
    }

    public getBookId():string {
        return this.bookId;
    }

    public setBookId(bookId:string):void {
        this.bookId = bookId;
    }

    public getUserId():string {
        return this.userId;
    }

    public setUserId(userId:string):void {
        this.userId = userId;
    }

    public getStartDate():string {
        return this.startDate;
    }

    public setStartDate(startDate:string):void {
        this.startDate = startDate;
    }

    public getEndDate():string {
        return this.endDate;
    }

    public setEndDate(endDate:string):void {
        this.endDate = endDate;
    }

    public getReturnedDate():string {
        return this.returnedDate;
    }

    public setReturnedDate(returnedDate:string):void {
        this.returnedDate = returnedDate;
    }

}

export default Reservation;