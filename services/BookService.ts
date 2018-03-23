import {inject, injectable} from "inversify";
import TYPES from "../constants/Types";
import {BookRepository} from "../repositories/BookRepository";
import Book from "../models/Book";
import {generateError} from "./ErrorService";

const uuid = require('uuid/v4');

@injectable()
export class BookService {
    constructor(@inject(TYPES.BookRepository) private bookRepository: BookRepository) {
    }

    public async findAll(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }

    public async findOne(id: string): Promise<Book> {
        let book:Book;
        try{
            book = await this.bookRepository.findOne(id);
        }catch(err) {
            console.error(err);
            throw generateError("An unknown error occurred", 500);
        }
        if(!book)
            throw generateError("Book could not be located", 404);

        return book;
    }

    public async addBook(book: Book): Promise<Book> {
        this.validateBook(book);
        if (await this.bookRepository.existsByTitle(book.title)) {
            let err = generateError("Book with title already reservationActive", 409);
            throw err;
        }
        book.id = uuid();
        return await this.bookRepository.putBook(book);
    }

    public async updateBook(book: Book, id: string): Promise<Book> {
        this.validateBook(book);
        if (!await this.bookRepository.exists(id))
            throw generateError("Book with specified ID does not exist", 404);

        try {
            return await this.bookRepository.putBook(book);
        } catch (err) {
            console.error(err.message);
            throw generateError("An unkown error occurred", 500);
        }

    }

    public async deleteBook(id: string): Promise<void> {
        if(!await this.bookRepository.exists(id))
            throw generateError("Book with specified ID does not exist", 404);

        try {
            console.log("HERE");
            await this.bookRepository.delete(id);
        } catch (err) {
            console.error(err);
            throw generateError("An unknown error occurred", 500);
        }
    }

    private validateBook(book: Book): void {
        if (!book)
            throw generateError("Must supply a book object", 400);
        let {title, author, description, publisher, imgSrc} = book;
        if (!title || title === "")
            throw generateError("Must include a book title", 400);
        if (!author || author === "")
            throw generateError("Must include an author", 400);
        if (!description || description === "")
            throw generateError("Must include a description", 400);
        if (!publisher || publisher === "")
            throw generateError("Must include a publisher", 400);
        if (imgSrc && typeof imgSrc !== "string")
            throw generateError("Image source must be a string", 400);


    }
}