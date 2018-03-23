import {controller, httpDelete, httpGet, httpPatch, httpPost, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import {Request, Response} from 'express';
import TYPES from './../constants/Types';
import {BookService} from "../services/BookService";

@controller('/books')
export class BookController {
    constructor(@inject(TYPES.BookService) private bookService: BookService) {
    }

    @httpGet('/')
    public async getBooks(@request() req: Request, @response() res: Response) {
        return await this.bookService.findAll();
    }

    @httpGet('/:id')
    public async getOneBook(@request() req:Request, @response() res: Response) {
        return await this.bookService.findOne(req.params.id);
    }

    @httpPost('/')
    public async addBook(@request() req:Request, @response() res: Response) {
        return await this.bookService.addBook(req.body)
            .then(book => {
            res.status(201).json(book);
        });
    }

    @httpPatch('/:id')
    public async updateBook(@request() req:Request, @response() res: Response) {
        return await this.bookService.updateBook(req.body, req.params.id);
    }

    @httpDelete('/:id')
    public async deleteBook(@request() req:Request, @response() res: Response) {
        return await this.bookService.deleteBook(req.params.id);
    }
}