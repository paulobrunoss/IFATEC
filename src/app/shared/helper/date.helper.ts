import * as moment from 'moment';
import { unitOfTime } from 'moment';

export class DateHelper {

    /**
     * Metodo que retorna um number com a idade em anos
     * @param  {{jsdate}} valor  O valor precisa ser um objeto que contenha uma propriedade jsdate
     * @returns string
     */
    static calcularIdade(valor: { jsdate }, tipoIdade: unitOfTime.Diff = 'year'): string {
        if (valor && valor.jsdate) {
            const dataNascimento = moment(valor.jsdate);
            const idade = moment().diff(dataNascimento, tipoIdade);
            return idade.toString();
        }
        return '';
    }


    /**
    * Metodo que retorna uma data com a idade passada
    * @param  {{jsdate}} valor  O valor precisa ser um objeto que contenha uma propriedade jsdate
    * @returns string
    */
    static calcularDataComIdade(valor: string | number): moment.Moment {

        if (valor) {
            const hoje = moment();
            // tslint:disable-next-line:radix
            const idade = typeof valor === 'string' ? parseInt(valor) : valor;
            const dataNascimento = hoje.subtract(idade, 'year');

            return dataNascimento.startOf('year');
        }
        return null;
    }
}
