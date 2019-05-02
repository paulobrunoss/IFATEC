import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoGlobalService {

  constructor() { }

  private memoryStorage = new Object();

  obter(chave: string, metodo: string): any {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        return JSON.parse(window.localStorage.getItem(chave));
      case 'SESSIONSTORAGE':
        return JSON.parse(window.sessionStorage.getItem(chave));
      case 'MEMORYSTORAGE':
      default:
        return this.memoryStorage[chave];
    }
  }

  armazenar(chave: string, valor: any, metodo: string) {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        window.localStorage.setItem(chave, JSON.stringify(valor));
        break;
      case 'SESSIONSTORAGE':
        window.sessionStorage.setItem(chave, JSON.stringify(valor));
        break;
      case 'MEMORYSTORAGE':
      default:
        this.memoryStorage[chave] = valor;
        break;
    }
  }

  remover(chave: string, metodo: string) {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        window.localStorage.removeItem(chave);
        break;
      case 'SESSIONSTORAGE':
        window.sessionStorage.removeItem(chave);
        break;
      case 'MEMORYSTORAGE':
      default:
        break;
    }
  }
}
