import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

export default function checksUserValidator(
    request: Request, response: Response, next: NextFunction
): void {
    const { name, email, birthDate, cpf } = request.body;

    try {



        return next();
    } catch {
        throw new Error('bad request');
    }
}