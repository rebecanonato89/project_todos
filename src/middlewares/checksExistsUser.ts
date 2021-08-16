import { Request, Response, NextFunction } from "express";

export default function checksExistsUser(
    request: Request, response: Response, next: NextFunction
): void {
    const { cpf } = request.headers;

    try {

        if (!cpf) {
            throw new Error('unfilled cpf');
        }

        const auxCpf: string = cpf.toString();

        request.user = {
            cpf: auxCpf
        }

        return next();
    } catch {
        throw new Error('bad request');
    }
}