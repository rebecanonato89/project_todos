import { User } from '../typeorm/entities/User';
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


const usersRepository = new UsersRepository();
class AgeFindUsersService {
    public execute(): User[] {

        const users = usersRepository.findAll();

        const mage: any[] = []

        var data = new Date();
        var diaAtual = String(data.getDate()).padStart(2, '0');
        var mesAtual = String(data.getMonth() + 1).padStart(2, '0');
        var anoAtual = data.getFullYear();

        users.forEach(user => {
            const fullDate = String(user.birthDate);
            var fsplit = fullDate.split('/');

            var userday = fsplit.slice(0, 1)
            var nUday = Number(userday)
            var nAday = Number(diaAtual)

            var usermonth = fsplit.slice(1, 2)
            var nUmonth = Number(usermonth)
            var nAmonth = Number(mesAtual)

            var uyear = fsplit.slice(2, 3)
            var nUyear = Number(uyear)
            var nAyear = Number(anoAtual)
            var ry = nAyear - nUyear

            if (nAmonth < nUmonth || nAmonth == nUmonth && nAday < nUday) {
                ry--;
            }
            if (ry >= 18) {
                mage.push(user)
            }
        });

        return mage;
    }

}

export default AgeFindUsersService;