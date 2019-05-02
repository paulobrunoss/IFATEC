import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MensagemService } from '../mensagem/mensagem.service';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private readonly mensagem: MensagemService) { }



  static recuperarCampoLista(lista: any[], valorPesquisado: any, nomeCampoPesquisado: string) {

    const obj = lista.find(item => {
     return item[nomeCampoPesquisado] = valorPesquisado;
    });

    return obj;
  }

  /**
   * Helper para travar o formulario.enable()
   * @param  {FormGroup} formulario - Instancia do formulario dentro do component
   * @param {any} component - Instancia do component atual
   * @param  {string} nomeVarlock - Nome da variavel que diz dentro do component se pode ou não habilitar o form.enable()
   */
  static validarEnableForm(formulario: FormGroup, component: any, nomeVarlock: string) {

    for (const key in formulario.controls) {
      if (key) {
        (<any>formulario.controls[key])._enable = formulario.controls[key].enable;
        (<any>formulario.controls[key]).enable = function (args) {
          if (!component[nomeVarlock]) {
            this._enable(args);
          }
        };
      }
    }
  }

  /**
   * Quando o valor do campo primario for vazio o valor do campo secundario vai ser vazio
   * @param  {control1: string, control2: string} lista - onde control1 é o primario e control2 é o secundario
   * @returns Subscription
   */
  static limparCampoSecundarios(formulario: FormGroup, lista: { control1: string, control2: string }[]): Subscription[] {
    const listaSubscriptions: Subscription[] = [];

    lista.forEach(controls => {
      listaSubscriptions.push(formulario.get(controls.control1).valueChanges.subscribe(value => {
        if (value === undefined || value === null || typeof value === 'string' && value.trim() === '') {
          formulario.get(controls.control2).setValue('', { emitEvent: false });
        }
      }));
    });

    return listaSubscriptions;
  }

  static removerAcento(string): string {
    return string.replace(/[ç]/gi, 'c')
      .replace(/[áàâäãå]/gi, 'a')
      .replace(/[éèêë]/gi, 'e')
      .replace(/[íìîï]/gi, 'i')
      .replace(/[ñ]/gi, 'n')
      .replace(/[óòôöõ]/gi, 'o')
      .replace(/[úùûü]/gi, 'u');
  }


  /**
   * Percorre os controlles do form form passado
   * @param  {any} formulario
   */
  static marcarTodosControlsAsToutched(formulario: FormGroup) {
    const controls = formulario.controls;
    for (const key in controls) {
      if (key) {
        const formConstol: AbstractControl = controls[key];
        formConstol.markAsTouched();
      }
    }
  }

  converterDataEnUS(data: string) {
    const inputData = moment(data, 'DD/MM/YYYY', true);
    if (!data || !inputData.isValid()) {
      return '';
    }

    return inputData.format('YYYY-MM-DD');
  }

  converterDataPtBR(data: string) {
    const inputData = moment(data, 'YYYY-MM-DD', true);
    if (!data || !inputData.isValid()) {
      return '';
    }

    return inputData.format('DD/MM/YYYY');
  }

  buscaString(data: string, busca: string) {
    if (data.toString().toLowerCase().search(busca.toString().toLowerCase()) === -1) {
      return false;
    } else {
      return true;
    }
  }



  /**
   * Gera um GUID que está de acordo com a documentação do RFC4122.
   */
  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  validarData(dp: NgxMyDatePickerDirective, data, traducoesBotoes, mensagem, callback): boolean {
    if (data && moment(data.jsdate) < moment().startOf('day')) {
      this.mensagem.confirm(
        mensagem,
        null,
        callback,
        'informacao',
        {
          textoPersonalizado: {
            btnSim: traducoesBotoes.BOTAO_SIM,
            btnNao: traducoesBotoes.BOTAO_NAO,
            titulo: traducoesBotoes.TITULO_MODAL
          }
        }
      );
    }

    return !dp.isDateValid() && dp['elem'].nativeElement.value.length > 0;
  }
  /**
   * Adiciona comportamento de rolagem a pagina quando modal for aberto
   * possibilitando que modais muito extensos possam ser visualizados.
   * - Deve ser adicionado ao options do modal.
   * @param  {} modal
   */
  adicionarRolagem(modal) {
    document.querySelector('body').style.overflow = 'auto';
    modal.css('position', 'absolute');
  }

  /**
   * Metodo que seta Erro NotFound no formcontrol passado
   * @param  {} status
   * @param  {AbstractControl} formControl
   */

  montarGetUrl(formulario: any) {
    let form = [];
    formulario.value ? form = formulario.getRawValue() : form = formulario;
    let url = '?';
    for (const key in form) {
      if (form[key] && key !== 'constructor') {
        if (form[key].constructor === Array
        ) {
          if (form[key].length > 0) {
            form[key].forEach(valor => {
              url = url + key + '=' + valor + '&';
            });
          }
        } else {
          url = url + key + '=' + form[key] + '&';
        }
      }
    }
    return url.substr(0, (url.length - 1));
  }

  verificarConteudoFormulario(formulario: FormGroup) {
    const form = formulario.getRawValue();
    let status = false;
    for (const key in form) {
      if (form[key]) {
        status = true;
      }
    }
    return status;
  }

  /**
   * @param  {} traducoesTabela tradução tabela
   * @param  {} targets quantidades coluna
   * @param  {} order? coluna de ordenação
   * @param  {} tooltipList? tooltip
   * @param  {} pageLength? registro por páginas
   */
  montarDataTable(traducoesTabela, targets, order?, tooltipList?, pageLength?, paging?) {

    const configColumns = [].concat([
      { orderable: false, targets: 0 },
      { orderable: false, targets: (targets - 3) },
      { orderable: false, targets: (targets - 2) },
      { orderable: false, targets: (targets - 1) },
      { orderable: false, targets: targets }
    ]);

    if (tooltipList) {
      const obj = {
        targets: tooltipList,
        render: function (data) {
          return data.length > 70 ?
            data.substr(0, 70) + '…' :
            data;
        }
      };
      configColumns.push(obj);
    }



    return {
      pagingType: 'simple_numbers',
      paging: paging ? paging : false,
      language: traducoesTabela,
      pageLength: pageLength ? pageLength : 10,
      searching: false,
      lengthChange: false,
      info: false,
      order: [order ? order : 2, 'asc'],
      columnDefs: configColumns
    };
  }

}
