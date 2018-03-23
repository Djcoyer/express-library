import * as admin from "firebase-admin";
import {serviceAccount} from "../config";


export class FirebaseConnection {
    private static isConnected: boolean = false;
    private static db: any;

    public static getConnection(result: (connection) => void) {
        if(this.isConnected)
            return result(this.db);
        else {
            this.connect();
        }
    }

    private static connect() {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: serviceAccount.project_id,
                clientEmail:serviceAccount.client_email,
                privateKey: serviceAccount.private_key})
        });
        this.db = admin.firestore();
        this.isConnected = true;
    }
}