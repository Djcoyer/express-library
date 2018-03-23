
const uuid = require('uuid/v4');


export class Book {
    private _title: string;
    private _author: string;
    private _description: string;
    private _id: string;
    private _imgSrc: string;
    private _publisher: string;
    private _releaseDate: string;

    constructor(id?:string, title?:string, description?:string, author?:string, imgSrc?:string, publisher?:string,releaseDate?:string)
    constructor(id:string, title:string, description:string, author:string, imgSrc:string, publisher:string,releaseDate:string) {
        this._title = title || "";
        this._author = author || "";
        this._description = description || "";
        this._id = id || uuid();
        this._imgSrc = imgSrc || "";
        this._publisher = publisher || "";
        this._releaseDate = releaseDate || "";
    }

    get releaseDate(): string {
        return this._releaseDate;
    }

    set releaseDate(value: string) {
        this._releaseDate = value;
    }
    get publisher(): string {
        return this._publisher;
    }

    set publisher(value: string) {
        this._publisher = value;
    }
    get imgSrc(): string {
        return this._imgSrc;
    }

    set imgSrc(value: string) {
        this._imgSrc = value;
    }
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }


}

export default Book;