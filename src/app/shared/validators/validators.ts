import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import * as Moment from 'moment';
import 'moment/locale/pt-br';
import { DateHelper } from '../helper/date.helper';

export class DataValidators {
  constructor() { }
  /**
   * Efetua a validação se a data é menor que Hoje
   * @param  {string} data1
   * @param  {string} data2
   * @returns ValidatorFn
   */
  static dataFutura(formControl: AbstractControl): ValidationErrors {
    if (formControl.value && formControl.value.jsdate) {
      const hoje = Moment();
      const dataDigitada = Moment(formControl.value.jsdate);

      if (hoje.isBefore(dataDigitada)) {

        return { dataFutura: true };
      } else {
        return null;
      }
    }
    return null;
  }

  static dataAnterior(formControl: AbstractControl): ValidationErrors {
    if (formControl.value && formControl.value.jsdate) {
      const hoje = Moment();
      const dataDigitada = Moment(formControl.value.jsdate);

      if (hoje.isAfter(dataDigitada)) {

        return { dataFutura: true };
      } else {
        return null;
      }
    }
    return null;
  }

  static menorDeIdade(formControl: AbstractControl): ValidationErrors {
    if (formControl.value && formControl.value.jsdate) {
      const maiordeIdade = 18;
      const idade = DateHelper.calcularIdade(formControl.value);
      if (+idade < maiordeIdade) {
        return { menorDeIdade: true };
      } else {
        return null;
      }
    }
    return null;
  }

  /**
   * Efetua a validação se a data1 é menor que data2
   * @param  {string} data1
   * @param  {string} data2
   * @param {string} errorMessage - Mensagem custom para validação de datas
   * @returns ValidatorFn
   */
  dataMenorQueValidator(data1: string, data2: string, errorMessage?: string): ValidatorFn {

    errorMessage = errorMessage || 'dataMenor';

    return (form: FormGroup): { [key: string]: any } => {
      const _formDataMaior: AbstractControl = form.controls[data1];
      const _formDataMenor: AbstractControl = form.controls[data2];
      if (_formDataMenor.value && _formDataMaior.value) {
        const _dataMaior = Moment(_formDataMaior.value.jsdate);
        const _dataMenor = Moment(_formDataMenor.value.jsdate);
        if (_dataMaior.isBefore(_dataMenor)) {
          _formDataMaior.setErrors({ [errorMessage]: true });
          return { [errorMessage]: true };
        } else {
          if (_formDataMaior.hasError(errorMessage)) {
            delete _formDataMaior.errors[errorMessage];
            _formDataMaior.updateValueAndValidity({ emitEvent: false });
            _formDataMenor.updateValueAndValidity({ emitEvent: false });
          }
          return null;
        }
      }
      if (_formDataMaior.hasError(errorMessage)) {
        delete _formDataMaior.errors[errorMessage];
        _formDataMaior.updateValueAndValidity({ emitEvent: false });
        _formDataMenor.updateValueAndValidity({ emitEvent: false });
      }
      return null;
    };
  }

  dataValidadeExpirada(data: string): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
      const _formDataValidade: AbstractControl = form.controls[data];
      if (_formDataValidade.value) {
        const _dataValidade = Moment(_formDataValidade.value.jsdate);
        if (_dataValidade < Moment().startOf('day')) {
          _formDataValidade.setErrors({ dataExpirada: true });
          return { dataExpirada: true };
        } else {
          _formDataValidade.setErrors(null);
          return null;
        }
      }
      _formDataValidade.setErrors(null);
      return null;
    };
  }
}



export class FieldsValidators {
  constructor() { }

  /**
   * Metodo que valida se um campo tem um valor maior que o requerido
   * @param  {string} campo
   * @param  {{valorHaComparar?:number, controlName?: string, msgComplementar: string, tipoComparacao: '>='|'>'}} config -
   * Configurações: 
   * caso seja passado controlName error = deveSerMaiorQueCampo, caso contrario error = deveSerMaiorQue
   * tipoComparação padrão é '>='
   */
  static comparacaoNumerica(
    campo: string,
    config: {
      valorHaComparar?: number,
      controlName?: string,
      msgComplementar: string,
      tipoComparacao: '>=' | '>' | '<=' | '<'
    }
  ): ValidatorFn {

    return (form: FormGroup): { [key: string]: any } => {
      const formControl: AbstractControl = form.controls[campo];
      let erro = null;
      const valorComparado = config.controlName ? parseFloat(form.controls[config.controlName].value) : config.valorHaComparar;
      const tipoErro = config.controlName ? 'deveSerMaiorQueCampo' : 'deveSerMaiorQue';

      const operadores = {
        '>': function (a, b): boolean { return a > b; },
        '>=': function (a, b): boolean { return a >= b; },
        '<=': function (a, b): boolean { return a <= b; },
        '<': function (a, b): boolean { return a < b; },
      };

      if (formControl.value === '' || formControl.value === null || formControl.value === undefined) {
        return erro;
      }

      const valor = parseFloat(formControl.value) ? parseFloat(formControl.value) : 0;

      if (operadores[config.tipoComparacao](valorComparado, valor)) {

        erro = formControl.errors || {};
        erro.comparacaoNumerica = { mensagem: config.msgComplementar };
        formControl.setErrors(erro);

      } else if (formControl.errors && formControl.errors.comparacaoNumerica) {

        delete formControl.errors.comparacaoNumerica;

        if (!Object.entries(formControl.errors).length) {
          formControl.setErrors(null);
        }
      }

      return erro;
    };
  }

  static naoPodeSerZero(formControl: AbstractControl): ValidationErrors {
    const error = formControl.value === 0 ? { naoPodeSerZero: true } : null;

    return error;
  }

  /**
   * Efetua validação verificando se o campo possui somente caracteres em branco
   * @returns ValidatorFn
   */
  static campoBranco(campo: string): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
      const valorCampo: AbstractControl = form.controls[campo];

      if (!valorCampo.value) {
        return null;
      }
      const input = valorCampo.value.toString() === 'undefined' ? '' : valorCampo.value.toString();
      if (!input.trim()) {
        valorCampo.setErrors({ campoBranco: true });
        return { campoBranco: true };
      }
      return null;
    };
  }

  static requiredIf(campo: string, bool: Function): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
      const valorCampo: AbstractControl = form.controls[campo];
      const value = valorCampo.value;
      if ((value == null || value === undefined || value === '' || (Array.isArray(value) && !value.length)) && bool()) {
        valorCampo.setErrors({ requiredIf: true });
        return { requiredIf: true };
      } else {
        if (valorCampo.hasError('requiredIf')) {
          delete valorCampo.errors.requiredIf;
          // verifica se o erros não tem mais nenhuma propriedade
          // e faz um setErrors
          if (Object.keys(valorCampo.errors).length === 0 && valorCampo.errors.constructor === Object) {
            valorCampo.setErrors(null);
          }
        }
        return null;
      }
    };
  }

  static validarCpf(formControl: AbstractControl): ValidationErrors {
    const _strCPF = formControl.value;

    if (_strCPF) {
      let strCPF;
      // em caso do valor vir como Numero transfor para string
      if (typeof _strCPF === 'number') {
        strCPF = _strCPF.toString();
      } else {
        strCPF = _strCPF;
      }

      if (strCPF !== undefined && strCPF !== null && strCPF !== '') {
        strCPF = strCPF.toString().replace(/[\.\-]/g, '');

        let Soma = 0;
        let Resto;

        if (strCPF === '00000000000') {
          return { cpfInvalido: true };
        }

        for (let i = 1; i <= 9; i++) {

          Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) {
          Resto = 0;
        }


        if (Resto !== parseInt(strCPF.substring(9, 10))) {
          return { cpfInvalido: true };
        }

        Soma = 0;
        for (let i = 1; i <= 10; i++) {

          Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) {
          Resto = 0;
        }

        if (Resto !== parseInt(strCPF.substring(10, 11))) {
          return { cpfInvalido: true };
        }
        return null;
      }
    }

    return null;
  }

  /**
   * Efetua validação verificando se o campo possui somente caracteres em branco
   * @returns ValidatorFn
   */
  campoEmBranco(campo: string): ValidatorFn {

    return (form: FormGroup): { [key: string]: any } => {
      const valorCampo: AbstractControl = form.controls[campo];

      if (!valorCampo.value) {
        return null;
      }
      const input = valorCampo.value.toString() === 'undefined' ? '' : valorCampo.value.toString();
      if (!input.trim()) {
        valorCampo.setErrors({ campoBranco: true });
        return { campoBranco: true };
      }
      return null;
    };
  }

  campoListaVazia(campo: string): ValidatorFn {

    return (form: FormGroup): { [key: string]: any } => {
      const valorCampo: AbstractControl = form.controls[campo];

      if (!valorCampo.value) {
        return null;
      }
      if (!valorCampo.value.length) {
        valorCampo.setErrors({ campoBranco: true });
        return { campoBranco: true };
      }
      return null;
    };
  }

  // tslint:disable-next-line:member-ordering
  static validaHora(campo: string): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
      const valorCampo: AbstractControl = form.controls[campo];
      if (!valorCampo.value) {
        return null;
      }
      const input = valorCampo.value.toString() === 'undefined' ? '' : valorCampo.value.toString();
      if (parseInt(input.substr(0, 2), 10) >= 24 || parseInt(input.substr(2, 4), 10) >= 60 || input.length < 4) {
        valorCampo.setErrors({ horaInvalida: true });
        return { horaInvalida: true };

      } else {
        valorCampo.setErrors(null);
        return null;
      }
    };
  }

  // tslint:disable-next-line:member-ordering
  static validaDataHora(campoHora: string, campoData: string): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
      const dataHoje = false;
      const valorCampo: AbstractControl = form.controls[campoHora];
      const valorCampoData: AbstractControl = form.controls[campoData];
      const hojeAgora = Moment().format('HHmm');

      if (valorCampo.value > hojeAgora) {
        if (valorCampoData.value && valorCampoData.value.jsdate) {
          const hoje = Moment().format('DD/MM/YYYY');
          const dataDigitada = Moment(valorCampoData.value.jsdate).format('DD/MM/YYYY');

          if (hoje === dataDigitada) {
            valorCampo.setErrors({ dataFutura: true });
            return { dataFutura: true };
          } else {
            valorCampo.setErrors(null);
            return null;
          }
        }
      }

      if (!valorCampo.value) {
        return null;
      }
      const input = valorCampo.value.toString() === 'undefined' ? '' : valorCampo.value.toString();
      if (parseInt(input.substr(0, 2), 10) >= 24 || parseInt(input.substr(2, 4), 10) >= 60 || input.length < 4) {
        valorCampo.setErrors({ horaInvalida: true });
        return { horaInvalida: true };

      } else {
        valorCampo.setErrors(null);
        return null;
      }
    };
  }

  // tslint:disable-next-line:member-ordering
  static validaDataHoraFinal(campoHoraAdmissao: string, campoDataAdmissao: string, campoHora: string, campoData: string): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {

      const valorCampo: AbstractControl = form.controls[campoHora];
      const valorCampoData: AbstractControl = form.controls[campoData];
      const valorCampoHoraAdmissao: AbstractControl = form.controls[campoHoraAdmissao];
      const valorCampoDataAdmissao: AbstractControl = form.controls[campoDataAdmissao];

        const dataDigitada = valorCampoData.value ? Moment(valorCampoData.value.jsdate) : '';
        const dataAdmissao = valorCampoDataAdmissao.value ? Moment(valorCampoDataAdmissao.value, 'DD/MM/YYYY') : '';

        if (dataDigitada && dataDigitada.format('YYYY-MM-DD') === valorCampoDataAdmissao.value &&  valorCampoDataAdmissao.value) {
          if (valorCampo.value < valorCampoHoraAdmissao.value && valorCampoHoraAdmissao.value && valorCampo.value ) {
            valorCampo.setErrors({ dataAdmissao: true });
            return { dataAdmissao: true };
          } else {
            valorCampoData.setErrors(null);
            return null;
          }
        } else if (dataDigitada && dataDigitada.isBefore(dataAdmissao) && dataAdmissao) {
          valorCampoData.setErrors({ dataAdmissao: true });
          return { dataAdmissao: true };
        } else {
          valorCampoData.setErrors(null);
          return null;
        }
    };
  }

  // tslint:disable-next-line:member-ordering
  static validaHoraMenor(time1: string, time2, errorMessage?: string): ValidatorFn {
    errorMessage = errorMessage || 'horaAberturaMenor';

    return (form: FormGroup): { [key: string]: any } => {
      const formHoraAbertura: AbstractControl = form.controls[time1];
      const formHoraFechamento: AbstractControl = form.controls[time2];
      if (formHoraAbertura.value && formHoraFechamento) {
        const horaMenor = formHoraAbertura.value.toString() === 'undefined' ? '' : formHoraAbertura.value.toString();
        const horaMaior = formHoraFechamento.value.toString() === 'undefined' ? '' : formHoraFechamento.value.toString();
        if (horaMaior < horaMenor) {
          formHoraFechamento.setErrors({ [errorMessage]: true });
          return { [errorMessage]: true };
        } else {
          if (formHoraFechamento.hasError(errorMessage)) {
            delete formHoraFechamento.errors[errorMessage];
            formHoraAbertura.updateValueAndValidity({ emitEvent: false });
            formHoraFechamento.updateValueAndValidity({ emitEvent: false });
          }
          return null;
        }
      }
      if (formHoraFechamento.hasError(errorMessage)) {
        delete formHoraFechamento.errors[errorMessage];
        formHoraAbertura.updateValueAndValidity({ emitEvent: false });
        formHoraFechamento.updateValueAndValidity({ emitEvent: false });
      }
      return null;
    };
  }

  /**
  * Método validador de dias do mes.
  *
  */
  // tslint:disable-next-line:member-ordering
  static validarDia(campo: string): ValidatorFn {

    return (form: FormGroup): { [key: string]: any } => {
      const valorCampo: AbstractControl = form.controls[campo];

      if (!valorCampo.value) {
        return null;
      }
      const input = valorCampo.value !== '' ? Number(valorCampo.value) : null;
      if (input < 1 || input > 31) {
        valorCampo.setErrors({ diaInvalido: true });
        return { diaInvalido: true };
      }
      return null;
    };
  }

}

