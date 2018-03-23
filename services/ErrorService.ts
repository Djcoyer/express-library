import CustomError from "../models/CustomError";

export let generateError = (message, statusCode) => {
    let err = new CustomError(message,statusCode);
    err.status = statusCode;
    return err;
};