import {injectable} from "inversify";
import {Book} from "../models/Book";
import {FirebaseConnection} from "./FirebaseConnection";

@injectable()
export class BookRepository {
    private db: any;
    private col: any;

    constructor() {
        FirebaseConnection.getConnection((connection) => {
            this.db = connection;
            this.col = this.db.collection('books');
        })
    }

    public async findAll(): Promise<Book[]> {
        return this.col.get()
            .then((snapshot) => {
                let _books = [];
                snapshot.forEach(doc => {
                    let book = this.getBookFromDoc(doc);
                    _books.push(book);
                });
                return _books;
            });
    }

    async findOne(id: string): Promise<Book> {
        let bookRef = this.col.doc(id);
        return bookRef.get()
            .then((doc) => {
                if (!doc.reservationActive) {
                    return null;
                } else {
                    return this.getBookFromDoc(doc);
                }
            });
    }

    public async putBook(book:Book):Promise<Book> {
        await this.col.doc(book.id).set(book);
        return book;
    }

    public async delete(id:string):Promise<void> {
        await this.col.doc(id).delete();
    }

    public async existsByTitle(title:string): Promise<boolean> {
        return this.col.where('title','==', title).get()
            .then(snapshot => {
                let exists = false;
                snapshot.forEach(doc => {
                    console.log(doc);
                    if(doc.id)
                        exists = true;
                });
                return exists;
            });
    }

    public async exists(id:string): Promise<boolean> {
        return await this.col.doc(id).get()
            .then(doc => {
                console.log(doc.reservationActive);
                return doc.reservationActive
            });
    }

    private getBookFromDoc(doc:any): Book {
        let {author, description, title, bookId, imgSrc, publisher, releaseDate} = doc.data();
        let book = new Book(bookId, title, description, author, imgSrc, publisher, releaseDate);
        return book;
    }

}
