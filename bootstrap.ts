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
import './controllers/AuthController';
import AuthRepository from "./repositories/AuthRepository";
import AuthService from "./services/AuthService";
import UserService from "./services/UserService";
import UserRepository from "./repositories/UserRepository";
var jwt = require('express-jwt');

let container = new Container();
container.bind<ReservationService>(TYPES.ReservationService).to(ReservationService);
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
container.bind<ReservationRepository>(TYPES.ReservationRepository).to(ReservationRepository);
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);


let server = new InversifyExpressServer(container);
server.setConfig(app => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(jwt({ secret: 'UkunYpteLJHYUloAKNPalb0XYeJ06j7xUM8HHYX3kiLM8BIlVN_GgYD13AOVyxUa'}).unless({path: ['/login','/register']}));
    app.use(bodyParser.json());
});

server.setErrorConfig(app => {
    app.use((err, req, res,next) => {
        if(err instanceof CustomError)
            res.status(err.status).json({Message:err.Message});
        else if(err.name === 'UnauthorizedError') {
            let _err = {Message: err.message};
            res.status(401).send(_err);
        }
        else{
            console.error(err);
            res.status(err.status || 500).json({message: err.message || "An unknown error occurred"});
        }
    });
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log("Listening on port 3000");