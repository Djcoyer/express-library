import {injectable} from "inversify";
import {FirebaseConnection} from "./FirebaseConnection";
import Reservation from "../models/Reservation";

@injectable()
export default class ReservationRepository {
    private db:any;
    private col:any;

    constructor() {
        FirebaseConnection.getConnection((connection) => {
            this.db = connection;
            this.col = this.db.collection('reservations');
        });
    }

    public async findAll():Promise<Reservation[]> {
        let reservations:Reservation[] = [];
        return await this.col.get()
            .then(snapshot => {
                snapshot.forEach(doc=> {
                    let reservation = this.getReservationFromDoc(doc);
                    reservations.push(reservation);
                });
                return reservations;
            });
    }

    public async findOne(id:string):Promise<Reservation> {
        return await this.col.doc(id).get()
            .then(doc => {
             if(doc.exists)
                 return doc.data();
             else return null;
            }
        );
    }

    public async findByUserId(userId:string):Promise<Reservation[]> {
        return await this.col.where('userId', '==', userId).get()
            .then(snapshot => {
                let reservations = [];
                snapshot.forEach(doc => {
                    if(doc.exists)
                        reservations.push(doc.data());
                });
                return reservations;
            })
    }

    public async findByBookId(bookId: string):Promise<Reservation[]> {
        return await this.col.where('bookId', '==', bookId)
            .then(snapshot => {
                let reservations = [];
                snapshot.forEach(doc => {
                    if(doc.exists)
                        reservations.push(doc.data());
                });
                return reservations;
            });
    }

    public async putReservation(reservation:Reservation):Promise<Reservation> {
        let dbObject = {...reservation};
        await this.col.doc(dbObject['id']).set(dbObject);
        return reservation;
    }

    public async reservationActive(bookId:string):Promise<boolean> {
        let exists = false;
        await this.col.where('bookId', '==', bookId)
            .where('returnedDate','==',null).get()
            .then(snapshot => {
               snapshot.forEach(doc => {
                   if(doc.reservationActive) exists = true;
               });
            });
        return exists;
    }

    public async exists(id:string) {
        return await this.col.doc(id).get()
            .then(doc => {
                return doc.exists;
            });
    }


    private getReservationFromDoc(doc:any):Reservation {
        if(!doc) return null;
        let {id,bookId,startDate,endDate,userId,returnedDate} = doc.data();
        let reservation = new Reservation(id,bookId,startDate,endDate,userId,returnedDate);
        return reservation;
    }


}