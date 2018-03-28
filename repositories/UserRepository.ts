import {injectable} from "inversify";
import {FirebaseConnection} from "./FirebaseConnection";
import User from "../models/User";
import {generateError} from "../services/ErrorService";

@injectable()
export default class UserRepository {

    private db:any;
    private col:any;

    constructor() {
        FirebaseConnection.getConnection((connection) => {
            this.db = connection;
            this.col = connection.collection('users');
        })
    }

    public async putUser(user:User):Promise<User> {
        let dbUser = user.toJSON();
        if(!dbUser.auth0Id)
            delete dbUser.auth0Id;
        await this.col.doc(user.userId).set(dbUser);
        return user;
    }

    public async exists(userId:string):Promise<boolean> {
        return await this.col.doc(userId).get()
            .then(doc => {
                return doc.exists;
            });
    }

    public async existsByEmailAddress(emailAddress:string): Promise<boolean> {
        return this.col.where("emailAddress", "==", emailAddress).get()
            .then(snapshot => {
                let exists = false;
                snapshot.forEach(doc => {
                    if(doc.exists)
                        exists = true;
                });
                return exists;
            });
    }

    public async findByEmailAddress(emailAddress:string):Promise<User> {
        return await this.col.where("emailAddress", "==", emailAddress).get()
            .then(snapshot => {
                let user;
                snapshot.forEach(doc => {
                    if(doc.exists){
                        user = doc.data();
                        return;
                    }
                });
                return user;
            }).catch(err => {
                throw generateError(err.response.data, err.response.status);
            });
    }

    public async findOne(userId:string):Promise<any> {
        return await this.col.doc(userId).get()
            .then(doc => {
                if(doc.exists) {
                    return doc.data();
                }
            })
    }
}