import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

const usersRepository = new UsersRepository();

export default function checksExistsUser(
    request: Request, response: Response, next: NextFunction
): void {
    const { cpf } = request.headers;

    try {

        if (!cpf) {
            throw new Error('unfilled cpf');
        }

        const user = usersRepository.search(String(cpf));

        request.user = {
            user
        }

        return next();
    } catch {
        throw new Error('bad request');
    }
}