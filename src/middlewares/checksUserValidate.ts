import * as Yup from 'yup';
import { TransformFunction } from 'yup/lib/types';
import { parse, isDate } from 'date-fns';
import { cpf as validCPF } from 'cpf-cnpj-validator';

function parseDateString(
    value: any,
    originalValue: any,
): TransformFunction<Yup.DateSchema> {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'yyyy-MM-dd', new Date());

    return parsedDate;
}

const requestSchema = Yup.object({
    cpf: Yup.string()
        .length(11)
        .trim()
        .test(
            'test-validate-cpf',
            'Documento do titular do cartão inválido',
            value => {
                if (!value) {
                    return false;
                }

                if (!validCPF.isValid(value)) {
                    return false;
                }
                return true;
            },
        ).required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    birthDate: Yup.date().transform(parseDateString).required(),
});

export default requestSchema;