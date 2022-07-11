import { Response } from "express";
import httpStatus from "http-status";
import { DomainError } from "../DomainError";
export class ErrorManager {
    static manageError(error: any, res: Response) {
        if (error instanceof DomainError) {
            res.status(httpStatus.BAD_REQUEST).send(error.message);
        } else {
            console.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}
