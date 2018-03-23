import {inject, injectable} from "inversify";
import ReservationRepository from "../repositories/ReservationRepository";
import TYPES from "../constants/Types";
import Reservation from "../models/Reservation";
import {generateError} from "./ErrorService";
const uuid = require('uuid/v4');

@injectable()
export default class ReservationService {
    constructor(@inject(TYPES.ReservationRepository)private reservationRepository:ReservationRepository){}


    public async findAllReservations():Promise<Reservation[]> {
        return await this.reservationRepository.findAll();
    }

    public async findAllByUserId(userId: string) {
        return await this.reservationRepository.findByUserId(userId);
    }

    public async findAllByBookId(bookId: string) {
        if(!bookId)
            throw generateError("Must include a valid book ID in request.", 400);
        return await this.reservationRepository.findByBookId(bookId);
    }

    public async findReservation(id:string):Promise<Reservation> {
        let reservation = this.reservationRepository.findOne(id);
        if(reservation == null)
            throw generateError("Could not locate reservation with specified ID", 404);
        return reservation;
    }

    public async addReservation(addReservationRequest:any):Promise<Reservation> {
        let startDate = new Date();
        let endDate = this.calculateReservationEndDate(7);
        let reservation = new Reservation(null,addReservationRequest.bookId,startDate, endDate,addReservationRequest.userId,null);
        this.validateReservation(reservation);
        if(await this.reservationRepository.reservationActive(reservation.getBookId()))
            throw generateError("Reservation for book already active", 409);

        reservation.setId(uuid());
        return await this.reservationRepository.putReservation(reservation);
    }

    public async endReservation(id:string):Promise<Reservation> {
        let reservation = await this.findReservation(id);
        reservation.setReturnedDate(new Date().toString());
        return await this.reservationRepository.putReservation(reservation);
    }


    private calculateReservationEndDate(daysToAdd:number) {
        let date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date;
    }

    private validateReservation(reservation:Reservation):void {
        if(!reservation)
            throw generateError("Must supply a reservation", 400);
        if(!reservation.getUserId())
            throw generateError("Must include a user ID for reservation", 400);
        if(!reservation.getBookId())
            throw generateError("Must include a book ID for reservation", 400);
    }
}