import {inject} from "inversify";
import {controller, httpGet, httpPatch, httpPost, request, response} from "inversify-express-utils";
import TYPES from "../constants/Types";
import {Request, Response} from "express";
import ReservationService from "../services/ReservationService";

@controller('/reservations')
export class ReservationController {

    constructor(@inject(TYPES.ReservationService)private reservationService:ReservationService){}

    @httpPost('/')
    public async addReservation(@request() req:Request, @response() res:Response) {
        return await this.reservationService.addReservation(req.body);
    }

    @httpGet('/')
    public async getAllReservations(@request() req:Request, @response() res:Response) {
        return await this.reservationService.findAllReservations();
    }

    @httpGet('/:id')
    public async getReservationById(@request() req:Request) {
        return await this.reservationService.findReservation(req.params.id);
    }

    @httpGet('/user/:userId')
    public async getAllByUserId(@request() req:Request) {
        return await this.reservationService.findAllByUserId(req.params.userId);
    }

    @httpGet('/book/:bookId')
    public async getAllByBookId(@request() req: Request) {
        return this.reservationService.findAllByBookId(req.params.bookId);
    }

    @httpPatch('/:id')
    public async endReservation(@request() req: Request) {
        return await this.reservationService.endReservation(req.params.id);
    }
}