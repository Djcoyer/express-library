const TYPES = {
    BookService: Symbol.for("BookService"),
    BookRepository: Symbol.for("BookRepository"),
    ReservationService: Symbol.for("ReservationService"),
    ReservationRepository: Symbol.for("ReservationRepository"),
    AuthRepository: Symbol.for("AuthRepository"),
    AuthService: Symbol.for("AuthService"),
    UserService: Symbol.for("UserService"),
    UserRepository: Symbol.for("UserRepository")
};

export default TYPES;