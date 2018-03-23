import 'reflect-metadata';
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import * as bodyParser from 'body-parser';
import {BookService} from "./services/BookService";
import TYPES from './constants/Types';
import {BookRepository} from "./repositories/BookRepository";
import CustomError from "./models/CustomError";
import ReservationRepository from "./repositories/ReservationRepository";
import ReservationService from "./services/ReservationService";
import './controllers/BookController';
import './controllers/ReservationController';

let container = new Container();
container.bind<ReservationService>(TYPES.ReservationService).to(ReservationService);
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
container.bind<ReservationRepository>(TYPES.ReservationRepository).to(ReservationRepository);

let server = new InversifyExpressServer(container);
server.setConfig(app => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

server.setErrorConfig(app => {
    app.use((err, req, res,next) => {
        if(err instanceof CustomError)
            res.status(err.status).json({message:err.message});
        else{
            console.error(err);
            res.status(500).json({message: "An unknown error occurred"});
        }
    });
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log("Listening on port 3000");